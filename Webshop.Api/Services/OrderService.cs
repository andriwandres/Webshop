using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Webshop.Api.Database;
using Webshop.Api.Models.Domain;
using Webshop.Api.Models.Dto.Order;
using Webshop.Api.Models.ViewModel.Order;
using Webshop.Api.SignalR.Events;
using Webshop.Api.SignalR.Hubs;

namespace Webshop.Api.Services
{
    public class OrderService
    {
        private readonly IMapper _mapper;
        private readonly WebshopContext _context;
        private readonly AuthService _authService;
        private readonly ClaimsPrincipal _user;
        private readonly IHubContext<WebshopHub> _hubContext;

        public OrderService(IMapper mapper, WebshopContext context, AuthService authService, IHubContext<WebshopHub> hubContext, IHttpContextAccessor httpContext)
        {
            _user = httpContext.HttpContext.User;
            _mapper = mapper;
            _context = context;
            _hubContext = hubContext;
            _authService = authService;
        }

        public async Task<IEnumerable<OrderViewModel>> GetOrders(CancellationToken cancellationToken = default)
        {
            AppUser user = await _authService.GetUser(_user, cancellationToken);

            IEnumerable<OrderViewModel> orders = _context.Orders
                .AsNoTracking()
                .Include(o => o.Product)
                .Where(o => o.UserId == user.UserId)
                .ProjectTo<OrderViewModel>(_mapper.ConfigurationProvider);

            return orders;
        }

        public async Task<IEnumerable<OrderViewModel>> Checkout(OrderDto model, CancellationToken cancellationToken = default)
        {
            AppUser user = await _authService.GetUser(_user, cancellationToken);

            IQueryable<CartItem> cart = _context.CartItems
                .Include(ci => ci.Product)
                .ThenInclude(p => p.Images)
                .Where(ci => ci.UserId == user.UserId);
           
            IQueryable<Order> orders = cart.ProjectTo<Order>(_mapper.ConfigurationProvider);

            PaymentMethod paymentMethod = await _context.PaymentMethods
                .SingleOrDefaultAsync(pm => pm.PaymentMethodId == model.PaymentMethodId, cancellationToken);

            foreach (Order order in orders)
            {
                order.PaymentMethod = paymentMethod;
            }

            foreach (CartItem cartItem in cart)
            {
                cartItem.Product.Quantity -= cartItem.Quantity;
            }

            await _context.Orders.AddRangeAsync(orders, cancellationToken);

            _context.RemoveRange(cart);

            await _context.SaveChangesAsync(cancellationToken);

            IEnumerable<OrderViewModel> viewModels = await orders
                .ProjectTo<OrderViewModel>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return viewModels;
        }
    }
}
