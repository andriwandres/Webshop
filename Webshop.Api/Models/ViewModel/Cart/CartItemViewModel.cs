
namespace Webshop.Api.Models.ViewModel.Cart
{
    public class CartItemViewModel
    {
        public int CartItemId { get; set; }
        public int ProductId { get; set; }
        public string ProductTitle { get; set; }
        public string ProductImage { get; set; }
        public float Price { get; set; }
    }
}
