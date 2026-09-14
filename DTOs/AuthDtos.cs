namespace CmrsApi.DTOs
{
    public record RegisterDto(string Email, string Password, string FullName, string Role);
    public record LoginDto(string Email, string Password);
    public record AuthResponseDto(string Token, string Email, string Role);
}
