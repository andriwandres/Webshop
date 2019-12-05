using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Webshop.Api.Models.Domain
{
    public class AppUser
    {
        public AppUser()
        {
            Orders = new HashSet<Order>();
            Reviews = new HashSet<Review>();
            WishlistItems = new HashSet<WishlistItem>();
        }

        [Key]
        public int UserId { get; set; }

        [Required]
        public string Firstname { get; set; }

        [Required]
        public string Lastname { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [JsonIgnore]
        public byte[] PasswordHash { get; set; }

        [Required]
        [JsonIgnore]
        public byte[] PasswordSalt { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        #region Navigation Properties

        public ICollection<Order> Orders { get; set; }
        public ICollection<Review> Reviews { get; set; }
        public ICollection<WishlistItem> WishlistItems { get; set; }

        #endregion
    }
}
