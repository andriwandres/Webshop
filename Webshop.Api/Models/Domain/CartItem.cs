using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Webshop.Api.Models.Domain
{
    public class CartItem
    {
        [Key]
        public int CartItemId { get; set; }

        public int UserId { get; set; }
        public int ProductId { get; set; }

        #region Navigation Properties

        [ForeignKey(nameof(UserId))]
        public AppUser User { get; set; }

        [ForeignKey(nameof(ProductId))]
        public Product Product { get; set; }

        #endregion
    }
}
