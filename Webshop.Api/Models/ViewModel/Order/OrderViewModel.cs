using System;

namespace Webshop.Api.Models.ViewModel.Order
{
    public class OrderViewModel
    {
        public int ProductId { get; set; }
        public string ProductTitle { get; set; }
        public string ProductDescription { get; set; }
        public string PaymentMethod { get; set; }
        public int Quantity { get; set; }
        public float Price { get; set; }
        public string ProductImage { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
