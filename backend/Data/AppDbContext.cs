using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using CmrsApi.Models;

namespace CmrsApi.Data
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Room> Rooms => Set<Room>();
        public DbSet<Reservation> Reservations => Set<Reservation>();

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Reservation>()
                .HasOne(r => r.Room)
                .WithMany(rm => rm.Reservations)
                .HasForeignKey(r => r.RoomId);
        }
    }
}
