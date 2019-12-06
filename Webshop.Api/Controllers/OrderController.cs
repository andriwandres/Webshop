using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Webshop.Api.Models.Dto.Order;
using Webshop.Api.Models.ViewModel.Order;
using Webshop.Api.Services;

namespace Webshop.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class OrderController : ControllerBase
    {
        private readonly OrderService _orderService;
        private readonly ProductService _productService;

        public OrderController(ProductService productService, OrderService orderService)
        {
            _orderService = orderService;
            _productService = productService;
        }

        /// <summary>
        ///     Returns a list of orders placed by the user
        /// </summary>
        /// <param name="cancellationToken">
        ///     Token for cancelling the request. This token is provided by the framework itself
        /// </param>
        /// <returns>
        ///     List of orders
        /// </returns>
        [Authorize]
        [HttpGet("GetOrders")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<OrderViewModel>>> GetOrders(CancellationToken cancellationToken)
        {
            IEnumerable<OrderViewModel> orders = await _orderService.GetOrders(cancellationToken);

            return Ok(orders);
        }

        /// <summary>
        ///     Places an order for a product to a given quantity
        /// </summary>
        /// <param name="model">
        ///     Information for Order to be placed
        /// </param>
        /// <param name="cancellationToken">
        ///     Token for cancelling the request. This token is provided by the framework itself
        /// </param>
        /// <returns>
        ///     Placed order
        /// </returns>
        [Authorize]
        [HttpPost("PlaceOrder")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<OrderViewModel>> PlaceOrder([FromBody] OrderDto model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            bool productExists = await _productService.ProductExists(model.ProductId, cancellationToken);

            if (!productExists)
            {
                return NotFound();
            }

            bool hasQuantity = await _productService.HasQuantity(model, cancellationToken);

            if (!hasQuantity)
            {
                return BadRequest();
            }

            OrderViewModel order = await _orderService.PlaceOrder(model, cancellationToken);

            return Ok(order);
        }
    }
}
