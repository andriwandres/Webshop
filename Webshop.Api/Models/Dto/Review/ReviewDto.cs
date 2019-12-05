using System.ComponentModel.DataAnnotations;

namespace Webshop.Api.Models.Dto.Review
{
    public class ReviewDto
    {
        [Required]
        [Range(0, 5)]
        public float Stars { get; set; }

        [Required]
        public string Body { get; set; }
    }
}
