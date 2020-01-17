
namespace Webshop.Api.Models.ViewModel.Wishlist
{
    public class WishlistItemViewModel
    {
        public int WishlistItemId { get; set; }
        public int ProductId { get; set; }
        public string ProductTitle { get; set; }
        public string ProductImage { get; set; }
        public float Price { get; set; }
    }
}
