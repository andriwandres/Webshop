using AutoMapper;
using Webshop.Api.Migrations;
using Webshop.Api.Models.ViewModel.PaymentMethod;

namespace Webshop.Api.Configuration.MappingProfiles
{
    public class PaymentMethodProfile : Profile
    {
        public PaymentMethodProfile()
        {
            CreateMap<PaymentMethod, PaymentMethodViewModel>();
        }
    }
}
