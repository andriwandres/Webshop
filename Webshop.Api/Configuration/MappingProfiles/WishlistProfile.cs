using AutoMapper;
using System.Linq;
using Webshop.Api.Models.Domain;
using Webshop.Api.Models.ViewModel.Wishlist;

namespace Webshop.Api.Configuration.MappingProfiles
{
    public class WishlistProfile : Profile
    {
        public WishlistProfile()
        {
            CreateMap<WishlistItem, WishlistItemViewModel>()
                .ForMember(vm => vm.ProductTitle, config =>
                {
                    config.MapFrom(wi => wi.Product.Title);
                })
                .ForMember(vm => vm.Price, config =>
                {
                    config.MapFrom(wi => wi.Product.Price);
                })
                .ForMember(vm => vm.ProductImage, config =>
                {
                    config.MapFrom(wi => wi.Product.Images.FirstOrDefault());
                });
        }
    }
}
