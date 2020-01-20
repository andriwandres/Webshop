using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Webshop.Api.Models.Domain
{
    public class PaymentMethod
    {
        public PaymentMethod()
        {
            Orders = new HashSet<Order>();
        }

        [Key]
        public int PaymentMethodId { get; set; }

        [Required]
        public string Name { get; set; }

        #region Navigation Properties

        public ICollection<Order> Orders { get; set; }

        #endregion
    }
}
