using System.ComponentModel.DataAnnotations;

namespace Webshop.Api.Models.Dto.User
{
    public class RegisterDto
    {
        [Required]
        public string Firstname { get; set; }

        [Required]
        public string Lastname { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression(@"^\S+$")]
        public string Password { get; set; }
    }
}
