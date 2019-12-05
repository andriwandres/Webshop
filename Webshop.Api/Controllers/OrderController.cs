using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Webshop.Api.Database;
using Webshop.Api.Models.Domain;
using Webshop.Api.Models.Dto.Order;
using Webshop.Api.Models.ViewModel.Order;
using Webshop.Api.Services;
using Webshop.Api.SignalR.Events;
using Webshop.Api.SignalR.Hubs;

namespace Webshop.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class OrderController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly WebshopContext _context;
        private readonly AuthService _authService;
        private readonly IHubContext<WebshopHub> _hubContext;

        public OrderController(IMapper mapper, WebshopContext context, AuthService authService, IHubContext<WebshopHub> hubContext)
        {
            _mapper = mapper;
            _context = context;
            _hubContext = hubContext;
            _authService = authService;
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
            AppUser user = await _authService.GetUser(User, cancellationToken);
            
            IEnumerable<OrderViewModel> orders = _context.Orders
                .AsNoTracking()
                .Include(o => o.Product)
                .Where(o => o.UserId == user.UserId)
                .ProjectTo<OrderViewModel>(_mapper.ConfigurationProvider);

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
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<OrderViewModel>> PlaceOrder([FromBody] OrderDto model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Product product = await _context.Products
                .Include(p => p.Images)
                .SingleOrDefaultAsync(p => p.ProductId == model.ProductId, cancellationToken);

            if (product is null)
            {
                return NotFound();
            }

            if (product.Quantity < model.Quantity)
            {
                return BadRequest();
            }

            AppUser user = await _authService.GetUser(User, cancellationToken);

            Order order = new Order
            {
                User = user,
                Product = product,
                Quantity = model.Quantity,
                CreatedAt = DateTime.Now,
            };

            product.Quantity -= model.Quantity;

            await _context.Orders.AddAsync(order, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            OrderViewModel viewModel = _mapper.Map<Order, OrderViewModel>(order);

            await _hubContext.Clients.All.SendAsync(SignalREvents.PlaceOrder, model, cancellationToken);

            return Created(nameof(PlaceOrder), viewModel);
        }
    }
}
