using AutoMapper;
using Webshop.Api.Models.Domain;
using Webshop.Api.Models.Dto.User;

namespace Webshop.Api.Configuration.MappingProfiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<RegisterDto, AppUser>();
        }
    }
}
