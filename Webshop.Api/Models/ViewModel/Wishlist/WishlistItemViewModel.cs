
namespace Webshop.Api.Models.ViewModel.Wishlist
{
    public class WishlistItemViewModel
    {
        public int ProductId { get; set; }
        public string ProductTitle { get; set; }
        public byte[] ProductImage { get; set; }
        public float Price { get; set; }
    }
}
