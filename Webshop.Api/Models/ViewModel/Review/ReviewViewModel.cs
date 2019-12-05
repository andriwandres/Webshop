using System;

namespace Webshop.Api.Models.ViewModel.Review
{
    public class ReviewViewModel
    {
        public int ReviewId { get; set; }
        public string AuthorName { get; set; }
        public string Body { get; set; }
        public float Stars { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
