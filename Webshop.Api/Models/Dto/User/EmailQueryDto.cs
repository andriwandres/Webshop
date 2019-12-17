using System.ComponentModel.DataAnnotations;

namespace Webshop.Api.Models.Dto.User
{
    public class EmailQueryDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
