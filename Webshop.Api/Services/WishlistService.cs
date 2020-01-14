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
using Webshop.Api.Models.ViewModel.Wishlist;
using Webshop.Api.SignalR.Hubs;

namespace Webshop.Api.Services
{
    public class WishlistService
    {
        private readonly IMapper _mapper;
        private readonly WebshopContext _context;
        private readonly AuthService _authService;
        private readonly ClaimsPrincipal _user;
        private readonly IHubContext<WebshopHub> _hubContext;

        public WishlistService(IMapper mapper, WebshopContext context, AuthService authService, IHubContext<WebshopHub> hubContext, IHttpContextAccessor httpContext)
        {
            _user = httpContext.HttpContext.User;
            _mapper = mapper;
            _context = context;
            _hubContext = hubContext;
            _authService = authService;
        }

        public async Task<IEnumerable<WishlistItemViewModel>> GetWishlist(CancellationToken cancellationToken = default)
        {
            AppUser user = await _authService.GetUser(_user, cancellationToken);

            IEnumerable<WishlistItemViewModel> items = _context.WishlistItems
                .AsNoTracking()
                .Include(wi => wi.Product)
                    .ThenInclude(p => p.Images)
                .Where(wi => wi.UserId == user.UserId)
                .ProjectTo<WishlistItemViewModel>(_mapper.ConfigurationProvider);

            return items;
        }

        public async Task<WishlistItemViewModel> AddWishlistItem(int productId, CancellationToken cancellationToken = default)
        {
            Product product = await _context.Products
                .Include(p => p.Images)
                .SingleOrDefaultAsync(p => p.ProductId == productId, cancellationToken);

            AppUser user = await _authService.GetUser(_user, cancellationToken);

            WishlistItem item = new WishlistItem
            {
                User = user,
                Product = product,
            };

            await _context.WishlistItems.AddAsync(item, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            WishlistItemViewModel viewModel = _mapper.Map<WishlistItem, WishlistItemViewModel>(item);

            return viewModel;
        }

        public async Task RemoveWishlistItem(int wishlistItemId, CancellationToken cancellationToken = default)
        {
            WishlistItem item = await _context.WishlistItems
                .SingleOrDefaultAsync(wi => wi.WishlistItemId == wishlistItemId, cancellationToken);

            _context.Remove(item);
            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task<bool> WishlistItemExists(int itemId, CancellationToken cancellationToken = default)
        {
            return await _context.WishlistItems.AnyAsync(wi => wi.WishlistItemId == itemId, cancellationToken);
        }

        public async Task<bool> IsInWishlist(int itemId, CancellationToken cancellationToken = default)
        {
            AppUser user = await _authService.GetUser(_user, cancellationToken);

            return await _context.WishlistItems.AnyAsync(wi => wi.UserId == user.UserId && wi.WishlistItemId == itemId, cancellationToken);
        }
    }
}
