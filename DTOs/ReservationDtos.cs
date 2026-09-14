using CmrsApi.Models;

namespace CmrsApi.DTOs
{
    public record CreateReservationDto(
        int RoomId,
        string Title,
        ReservationType Type,
        DateTime StartTime,
        DateTime EndTime
    );

    public record ReservationResponseDto(
        int Id,
        int RoomId,
        string RoomNumber,
        string Title,
        string ReservedBy,
        DateTime StartTime,
        DateTime EndTime,
        string Status
    );
}
