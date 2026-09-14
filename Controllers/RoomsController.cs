using CmrsApi.Data;
using CmrsApi.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CmrsApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RoomsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetRooms()
        {
            var now = DateTime.UtcNow;

            var rooms = await _context.Rooms
                .Select(r => new RoomStatusDto(
                    r.Id,
                    r.RoomNumber,
                    r.Building,
                    r.Capacity,
                    r.Reservations.Any(res => res.StartTime <= now && res.EndTime >= now),
                    r.Reservations
                        .Where(res => res.StartTime <= now && res.EndTime >= now)
                        .Select(res => res.Title)
                        .FirstOrDefault()
                ))
                .ToListAsync();

            return Ok(rooms);
        }
    }
}
