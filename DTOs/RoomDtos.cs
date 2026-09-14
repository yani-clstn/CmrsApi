namespace CmrsApi.DTOs
{
    public record RoomStatusDto(
        int Id,
        string RoomNumber,
        string Building,
        int Capacity,
        bool IsOccupied,
        string? CurrentClassOrEvent
    );
}
