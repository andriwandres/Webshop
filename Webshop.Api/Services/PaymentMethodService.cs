using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Webshop.Api.Database;
using Webshop.Api.Models.ViewModel.PaymentMethod;

namespace Webshop.Api.Services
{
    public class PaymentMethodService
    {
        private readonly IMapper _mapper;
        private readonly WebshopContext _context;

        public PaymentMethodService(WebshopContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<PaymentMethodViewModel>> GetPaymentMethods(CancellationToken cancellationToken = default)
        {
            IEnumerable<PaymentMethodViewModel> paymentMethods = await _context.PaymentMethods
                .ProjectTo<PaymentMethodViewModel>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return paymentMethods;
        }
    }
}
