using Microsoft.AspNetCore.Identity;
using CmrsApi.Models;

namespace CmrsApi.Data
{
    public static class DbSeeder
    {
        public static async Task SeedRolesAndRoomsAsync(IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var context = serviceProvider.GetRequiredService<AppDbContext>();

            string[] roles = { "Student", "ClassRep", "Instructor", "OrgLeader", "Security" };

            foreach (var role in roles)
            {
                if (!await roleManager.RoleExistsAsync(role))
                {
                    await roleManager.CreateAsync(new IdentityRole(role));
                }
            }

            if (!context.Rooms.Any())
            {
                context.Rooms.AddRange(
                    new Room { RoomNumber = "CL1", Building = "IT Building", Capacity = 40, HasProjector = true },
                    new Room { RoomNumber = "CL2", Building = "IT Building", Capacity = 40, HasProjector = true },
                    new Room { RoomNumber = "LH101", Building = "Main Academic", Capacity = 100, HasProjector = true }
                );
                await context.SaveChangesAsync();
            }
        }
    }
}
