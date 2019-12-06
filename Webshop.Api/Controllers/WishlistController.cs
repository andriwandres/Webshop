using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Webshop.Api.Models.ViewModel.Wishlist;
using Webshop.Api.Services;

namespace Webshop.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class WishlistController : ControllerBase
    {
        private readonly ProductService _productService;
        private readonly WishlistService _wishlistService;

        public WishlistController(WishlistService wishlistService, ProductService productService)
        {
            _productService = productService;
            _wishlistService = wishlistService;
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
            IEnumerable<WishlistItemViewModel> items = await _wishlistService.GetWishlist(cancellationToken);
            
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
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<WishlistItemViewModel>> AddWishlistItem([FromRoute] int productId, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            bool productExists = await _productService.ProductExists(productId, cancellationToken);

            if (!productExists)
            {
                return NotFound();
            }

            WishlistItemViewModel viewModel = await _wishlistService.AddWishlistItem(productId, cancellationToken);

            return Ok(viewModel);
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

            bool itemExists = await _wishlistService.WishlistItemExists(id, cancellationToken);

            if (!itemExists)
            {
                return NotFound();
            }

            await _wishlistService.RemoveWishlistItem(id, cancellationToken);

            return NoContent();
        }
    }
}
