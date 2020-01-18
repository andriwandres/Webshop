using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Webshop.Api.Models.ViewModel.PaymentMethod;
using Webshop.Api.Services;

namespace Webshop.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class PaymentMethodController : ControllerBase
    {
        private readonly PaymentMethodService _paymentMethodService;
        public PaymentMethodController(PaymentMethodService paymentMethodService)
        {
            _paymentMethodService = paymentMethodService;
        }

        [Authorize]
        [HttpGet("GetPaymentMethods")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<PaymentMethodViewModel>>> GetPaymentMethods(CancellationToken cancellationToken)
        {
            IEnumerable<PaymentMethodViewModel> paymentMethods = await _paymentMethodService
                .GetPaymentMethods(cancellationToken);

            return Ok(paymentMethods);
        }
    }
}
