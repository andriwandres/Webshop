using Webshop.Api.Models.Domain;

namespace Webshop.Api.Models.ViewModel.User
{
    public class AuthenticatedUser
    {
        public string Token { get; set; }
        public AppUser User { get; set; }
    }
}
