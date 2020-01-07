using AutoMapper;
using System.Linq;
using Webshop.Api.Models.Domain;
using Webshop.Api.Models.ViewModel.Cart;

namespace Webshop.Api.Configuration.MappingProfiles
{
    public class CartProfile : Profile
    {
        public CartProfile()
        {
            CreateMap<CartItem, CartItemViewModel>()
                .ForMember(vm => vm.ProductTitle, config =>
                {
                    config.MapFrom(ci => ci.Product.Title);
                })
                .ForMember(vm => vm.Price, config =>
                {
                    config.MapFrom(ci => ci.Product.Price);
                })
                .ForMember(vm => vm.ProductImage, config =>
                {
                    config.MapFrom(ci => ci.Product.Images.Count() == 0
                        ? null
                        : ci.Product.Images.FirstOrDefault().Image);
                });
        }
    }
}
