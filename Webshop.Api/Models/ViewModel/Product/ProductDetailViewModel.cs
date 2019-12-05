using System.Collections.Generic;
using Webshop.Api.Models.ViewModel.Review;

namespace Webshop.Api.Models.ViewModel.Product
{
    public class ProductDetailViewModel
    {
        public int ProductId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public float Price { get; set; }
        public IEnumerable<ProductImageViewModel> Images { get; set; }
        public IEnumerable<ReviewViewModel> Reviews { get; set; }
    }
}
