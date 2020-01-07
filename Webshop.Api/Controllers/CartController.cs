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

        [Authorize]
        [HttpGet("GetCart")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<CartItemViewModel>>> GetCart(CancellationToken cancellationToken)
        {
            IEnumerable<CartItemViewModel> cartItems = await _cartService.GetCart(cancellationToken);

            return Ok(cartItems);
        }

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

            CartItemViewModel cartItem = await _cartService.AddCartItem(productId, cancellationToken);

            return Ok(cartItem);
        }

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
