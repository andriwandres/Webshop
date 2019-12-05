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
using Webshop.Api.Models.ViewModel.Product;
using Webshop.Api.Models.ViewModel.Wishlist;
using Webshop.Api.Services;
using Webshop.Api.SignalR.Events;
using Webshop.Api.SignalR.Hubs;

namespace Webshop.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class WishlistController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly WebshopContext _context;
        private readonly AuthService _authService;
        private readonly IHubContext<WebshopHub> _hubContext;

        public WishlistController(WebshopContext context, AuthService authService, IMapper mapper, IHubContext<WebshopHub> hubContext)
        {
            _mapper = mapper;
            _context = context;
            _authService = authService;
            _hubContext = hubContext;
        }

        /// <summary>
        ///     Returns a list of products on a users wishlist
        /// </summary>
        /// <param name="cancellationToken">
        ///     Token for cancelling the request. This token is provided by the framework itself
        /// </param>
        /// <returns>
        ///     List of products on the users wishlist
        /// </returns>
        [Authorize]
        [HttpGet("GetWishlist")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<WishlistItemViewModel>>> GetWishlist(CancellationToken cancellationToken)
        {
            AppUser user = await _authService.GetUser(User, cancellationToken);

            IEnumerable<WishlistItemViewModel> items = _context.WishlistItems
                .AsNoTracking()
                .Include(wi => wi.Product)
                    .ThenInclude(p => p.Images)
                .Where(wi => wi.UserId == user.UserId)
                .ProjectTo<WishlistItemViewModel>(_mapper.ConfigurationProvider);
            
            return Ok(items);
        }

        /// <summary>
        ///     Adds a product to a users wishlist
        /// </summary>
        /// <param name="productId">
        ///     ID number of the product to add to the wishlist
        /// </param>
        /// <param name="cancellationToken">
        ///     Token for cancelling the request. This token is provided by the framework itself
        /// </param>
        /// <returns>
        ///     Created resource
        /// </returns>
        [Authorize]
        [HttpPost("AddWishlistItem/{productId:int}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<WishlistItemViewModel>> AddWishlistItem([FromRoute] int productId, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Product product = await _context.Products
                .AsNoTracking()
                .Include(p => p.Images)
                .SingleOrDefaultAsync(p => p.ProductId == productId, cancellationToken);

            if (product is null)
            {
                return NotFound();
            }

            AppUser user = await _authService.GetUser(User);

            WishlistItem item = new WishlistItem
            {
                User = user,
                Product = product,
            };

            await _context.WishlistItems.AddAsync(item, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            WishlistItemViewModel viewModel = _mapper.Map<WishlistItem, WishlistItemViewModel>(item);

            return Created(nameof(AddWishlistItem), viewModel);
        }

        /// <summary>
        ///     Removes a product from a users wishlist
        /// </summary>
        /// <param name="id">
        ///     Id of the wishlist item to remove
        /// </param>
        /// <param name="cancellationToken">
        ///     Token for cancelling the request. This token is provided by the framework itself
        /// </param>
        /// <returns>
        ///     No content
        /// </returns>
        [Authorize]
        [HttpDelete("RemoveWishlistItem/{id:int}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> RemoveWishlistItem([FromRoute] int id, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            WishlistItem item = await _context.WishlistItems
                .SingleOrDefaultAsync(wi => wi.WishlistItemId == id, cancellationToken);

            if (item is null)
            {
                return NotFound();
            }

            _context.Remove(item);
            await _context.SaveChangesAsync(cancellationToken);

            return NoContent();
        }
    }
}
