using AutoMapper;
using Webshop.Api.Models.Domain;
using Webshop.Api.Models.ViewModel.Review;

namespace Webshop.Api.Configuration.MappingProfiles
{
    public class ReviewProfile : Profile
    {
        public ReviewProfile()
        {
            CreateMap<Review, ReviewViewModel>()
                .ForMember(vm => vm.AuthorName, config =>
                {
                    config.MapFrom(r => $"{r.User.Firstname} {r.User.Lastname}");
                });
        }
    }
}
