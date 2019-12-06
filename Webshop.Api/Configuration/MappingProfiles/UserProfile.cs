using AutoMapper;
using Webshop.Api.Models.Domain;
using Webshop.Api.Models.Dto.User;
using Webshop.Api.Models.ViewModel.User;

namespace Webshop.Api.Configuration.MappingProfiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<RegisterDto, AppUser>();

            CreateMap<AppUser, AuthenticatedUser>()
                .ForMember(vm => vm.Token, config =>
                {
                    config.MapFrom((src, dest, member, context) => context.Items["Token"]);
                });
        }
    }
}
