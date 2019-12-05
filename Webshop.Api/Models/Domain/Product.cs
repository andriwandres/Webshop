using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Webshop.Api.Models.Domain
{
    public class Product
    {
        public Product()
        {
            Images = new HashSet<ProductImage>();
            Orders = new HashSet<Order>();
            Reviews = new HashSet<Review>();
            WishlistItems = new HashSet<WishlistItem>();
        }

        [Key]
        public int ProductId { get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public float Price { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        #region Navigation Properties

        public ICollection<ProductImage> Images { get; set; }
        public ICollection<Order> Orders { get; set; }
        public ICollection<Review> Reviews { get; set; }
        public ICollection<WishlistItem> WishlistItems { get; set; }

        #endregion
    }
}
