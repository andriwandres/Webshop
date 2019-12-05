using AutoMapper;
using System.Linq;
using Webshop.Api.Models.Domain;
using Webshop.Api.Models.ViewModel.Order;

namespace Webshop.Api.Configuration.MappingProfiles
{
    public class OrderProfile : Profile
    {
        public OrderProfile()
        {
            CreateMap<Order, OrderViewModel>()
                .ForMember(vm => vm.ProductTitle, config =>
                {
                    config.MapFrom(o => o.Product.Title);
                })
                .ForMember(vm => vm.ProductDescription, config =>
                {
                    config.MapFrom(o => o.Product.Description);
                })
                .ForMember(vm => vm.Price, config =>
                {
                    config.MapFrom(o => o.Product.Price * o.Quantity);
                })
                .ForMember(vm => vm.ProductImage, config =>
                {
                    config.MapFrom(o => o.Product.Images.FirstOrDefault());
                });
        }
    }
}
