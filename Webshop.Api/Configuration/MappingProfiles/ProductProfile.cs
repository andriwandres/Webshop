using AutoMapper;
using System.Linq;
using Webshop.Api.Models.Domain;
using Webshop.Api.Models.ViewModel.Product;
using Webshop.Api.Models.ViewModel.Review;

namespace Webshop.Api.Configuration.MappingProfiles
{
    public class ProductProfile : Profile
    {
        public ProductProfile()
        {
            CreateMap<Product, ProductListingViewModel>()
                .ForMember(vm => vm.AverageStars, config =>
                {
                    config.MapFrom(p => p.Reviews.Average(r => r.Stars));
                })
                .ForMember(vm => vm.ReviewsCount, config =>
                {
                    config.MapFrom(p => p.Reviews.Count());
                })
                .ForMember(vm => vm.Image, config =>
                {
                    config.MapFrom(p => p.Images.First().Image);
                });

            CreateMap<Product, ProductDetailViewModel>()
                .ForMember(vm => vm.Images, config =>
                {
                    config.MapFrom(p => p.Images.Select(i => new ProductImageViewModel
                    {
                        Image = i.Image,
                        Description = i.Description
                    }));
                })
                .ForMember(vm => vm.Reviews, config =>
                {
                    config.MapFrom(p => p.Reviews.Select(r => new ReviewViewModel
                    {
                        ReviewId = r.ReviewId,
                        AuthorName = $"{r.User.Firstname} {r.User.Lastname}",
                        Body = r.Body,
                        Stars = r.Stars,
                        CreatedAt = r.CreatedAt
                    }));
                });
        }
    }
}
