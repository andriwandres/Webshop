using AutoMapper;
using AutoMapper.QueryableExtensions;
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

        public OrderService(IMapper mapper, WebshopContext context, AuthService authService, IHubContext<WebshopHub> hubContext, ClaimsPrincipal user)
        {
            _user = user;
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

        public async Task<OrderViewModel> PlaceOrder(OrderDto model, CancellationToken cancellationToken = default)
        {
            Product product = await _context.Products
                .Include(p => p.Images)
                .SingleOrDefaultAsync(p => p.ProductId == model.ProductId, cancellationToken);

            AppUser user = await _authService.GetUser(_user, cancellationToken);

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

            await _hubContext.Clients.All.SendAsync(SignalREvents.ReduceQuantity, model, cancellationToken);

            return viewModel;
        }
    }
}
