using System.Security.Claims;
using CmrsApi.Data;
using CmrsApi.DTOs;
using CmrsApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CmrsApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ReservationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ReservationsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Authorize(Roles = "ClassRep,Instructor,OrgLeader")]
        public async Task<IActionResult> CreateReservation([FromBody] CreateReservationDto dto)
        {
            if (dto.StartTime >= dto.EndTime)
                return BadRequest("End time must be after start time.");

            // Schedule Conflict Detection Logic
            bool isConflicting = await _context.Reservations.AnyAsync(r =>
                r.RoomId == dto.RoomId &&
                r.Status == ReservationStatus.Approved &&
                dto.StartTime < r.EndTime &&
                dto.EndTime > r.StartTime);

            if (isConflicting)
                return BadRequest("Schedule Conflict: Room is already reserved for this time slot.");

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;

            var reservation = new Reservation
            {
                RoomId = dto.RoomId,
                UserId = userId,
                Title = dto.Title,
                Type = dto.Type,
                StartTime = dto.StartTime,
                EndTime = dto.EndTime,
                Status = ReservationStatus.Approved
            };

            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();

            return Ok("Reservation confirmed.");
        }
    }
}
