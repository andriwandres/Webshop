using System.ComponentModel.DataAnnotations;

namespace Webshop.Api.Models.Dto.Order
{
    public class OrderDto
    {
        [Required]
        public int ProductId { get; set; }

        [Required]
        public int Quantity { get; set; }
    }
}
