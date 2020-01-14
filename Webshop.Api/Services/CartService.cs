using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Webshop.Api.Database;
using Webshop.Api.Models.Domain;
using Webshop.Api.Models.ViewModel.Cart;

namespace Webshop.Api.Services
{
    public class CartService
    {
        private readonly IMapper _mapper;
        private readonly ClaimsPrincipal _user;
        private readonly WebshopContext _context;
        private readonly AuthService _authService;

        public CartService(WebshopContext context, AuthService authService, IHttpContextAccessor httpContext, IMapper mapper)
        {
            _user = httpContext.HttpContext.User;
            _mapper = mapper;
            _context = context;
            _authService = authService;
        }

        public async Task<IEnumerable<CartItemViewModel>> GetCart(CancellationToken cancellationToken)
        {
            AppUser user = await _authService.GetUser(_user, cancellationToken);

            IEnumerable<CartItemViewModel> cartItems = _context.CartItems
                .AsNoTracking()
                .Where(ci => ci.UserId == user.UserId)
                .ProjectTo<CartItemViewModel>(_mapper.ConfigurationProvider);

            return cartItems;
        }

        public async Task<CartItemViewModel> AddCartItem(int productId, CancellationToken cancellationToken)
        {
            Product product = await _context.Products
                .Include(p => p.Images)
                .SingleOrDefaultAsync(p => p.ProductId == productId, cancellationToken);

            AppUser user = await _authService.GetUser(_user, cancellationToken);

            CartItem item = new CartItem
            {
                User = user,
                Product = product,
            };

            await _context.CartItems.AddAsync(item, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            CartItemViewModel viewModel = _mapper.Map<CartItem, CartItemViewModel>(item);

            return viewModel;
        }

        public async Task RemoveCartItem(int cartItemId, CancellationToken cancellationToken = default)
        {
            CartItem item = await _context.CartItems
                .SingleOrDefaultAsync(ci => ci.CartItemId == cartItemId, cancellationToken);

            _context.Remove(item);
            await _context.SaveChangesAsync(cancellationToken);
        }
        
        public async Task<bool> CartItemExists(int cartItemId, CancellationToken cancellationToken = default)
        {
            return await _context.CartItems.AnyAsync(ci => ci.CartItemId == cartItemId, cancellationToken);
        }

        public async Task<bool> IsInCart(int productId, CancellationToken cancellationToken = default)
        {
            AppUser user = await _authService.GetUser(_user, cancellationToken);

            return await _context.CartItems.AnyAsync(ci => ci.UserId == user.UserId && ci.ProductId == productId, cancellationToken); 
        }
    }
}
