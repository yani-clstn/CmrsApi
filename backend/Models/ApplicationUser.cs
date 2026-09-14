using Microsoft.AspNetCore.Identity;

namespace CmrsApi.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; } = string.Empty;
    }
}
