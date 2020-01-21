using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Webshop.Api.Models.ViewModel.Cart;
using Webshop.Api.Services;

namespace Webshop.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class CartController : ControllerBase
    {
        private readonly CartService _cartService;
        private readonly ProductService _productService;

        public CartController(CartService cartService, ProductService productService)
        {
            _cartService = cartService;
            _productService = productService;
        }

        /// <summary>
        ///     Gets a list of cart items of the current user
        /// </summary>
        /// <param name="cancellationToken">
        ///     Token for cancelling the request. This token is provided by the framework itself
        /// </param>
        /// <returns>
        ///     List of cart items
        /// </returns>
        [Authorize]
        [HttpGet("GetCart")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<CartItemViewModel>>> GetCart(CancellationToken cancellationToken)
        {
            IEnumerable<CartItemViewModel> cartItems = await _cartService.GetCart(cancellationToken);

            return Ok(cartItems);
        }

        /// <summary>
        ///     Adds a product to the users cart
        /// </summary>
        /// <param name="productId">
        ///     Product to be placed in the users cart
        /// </param>
        /// <param name="cancellationToken">
        ///     Token for cancelling the request. This token is provided by the framework itself
        /// </param>
        /// <returns>
        ///     Product that has been placed in the users cart
        /// </returns>
        [Authorize]
        [HttpPost("AddCartItem/{productId:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CartItemViewModel>> AddCartItem([FromRoute] int productId, CancellationToken cancellationToken)
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

            bool productInCart = await _cartService.IsInCart(productId, cancellationToken);

            if (productInCart)
            {
                return BadRequest();
            }

            CartItemViewModel cartItem = await _cartService.AddCartItem(productId, cancellationToken);

            return Ok(cartItem);
        }

        /// <summary>
        ///     Removes an existing product from the users cart
        /// </summary>
        /// <param name="id">
        ///     ID number of cart item to remove
        /// </param>
        /// <param name="cancellationToken">
        ///     Token for cancelling the request. This token is provided by the framework itself
        /// </param>
        /// <returns>
        ///     ID number of cart item that has been removed
        /// </returns>
        [Authorize]
        [HttpDelete("RemoveCartItem/{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<int>> RemoveCartItem([FromRoute] int id, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            bool itemExists = await _cartService.CartItemExists(id, cancellationToken);

            if (!itemExists)
            {
                return NotFound();
            }

            await _cartService.RemoveCartItem(id, cancellationToken);

            return Ok(id);
        }
    }
}
