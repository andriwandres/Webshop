
namespace Webshop.Api.Models.ViewModel.Product
{
    public class ProductListingViewModel
    {
        public int ProductId { get; set; }
        public string Title { get; set; }
        public float Price { get; set; }
        public int Quantity { get; set; }
        public float AverageStars { get; set; }
        public int ReviewsCount { get; set; }
        public string Image { get; set; }
    }
}
