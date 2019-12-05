using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Webshop.Api.Models.Domain
{
    public class WishlistItem
    {
        [Key]
        public int WishlistItemId { get; set; }

        [Required]
        public int ProductId { get; set; }

        [Required]
        public int UserId { get; set; }

        #region Navigation Properties

        [ForeignKey(nameof(UserId))]
        public AppUser User { get; set; }

        [ForeignKey(nameof(ProductId))]
        public Product Product { get; set; }

        #endregion Navigation Properties
    }
}
