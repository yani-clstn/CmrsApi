namespace CmrsApi.Models
{
    public class Room
    {
        public int Id { get; set; }
        public string RoomNumber { get; set; } = string.Empty;
        public string Building { get; set; } = string.Empty;
        public int Capacity { get; set; }
        public bool HasProjector { get; set; }
        public bool IsMaintenance { get; set; }

        public ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
    }
}
