using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Webshop.Api.Models.Domain
{
    public class ProductImage
    {
        [Key]
        public int ProductImageId { get; set; }

        [Required]
        public int ProductId { get; set; }

        [Required]
        public byte[] Image { get; set; }

        public string Description { get; set; }

        #region Navigation Properties

        [ForeignKey(nameof(ProductId))]
        public Product Product { get; set; }

        #endregion
    }
}
