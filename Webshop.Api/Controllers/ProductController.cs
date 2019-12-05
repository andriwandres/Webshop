using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Webshop.Api.Database;
using Webshop.Api.Models.Domain;
using Webshop.Api.Models.ViewModel.Product;
using Webshop.Api.Services;

namespace Webshop.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ProductController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly ProductService _productService;

        public ProductController(ProductService productService, AuthService authService, WebshopContext context)
        {
            _authService = authService;
            _productService = productService;
        }

        /// <summary>
        ///     Returns a list of products
        /// </summary>
        /// <param name="cancellationToken">
        ///     Token for cancelling the request. This token is provided by the framework itself
        /// </param>
        /// <returns>
        ///     List of products
        /// </returns>
        [Authorize]
        [HttpGet("GetProducts")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<ProductListingViewModel>>> GetProducts(CancellationToken cancellationToken)
        {
            IEnumerable<ProductListingViewModel> products = await _productService.GetProducts(cancellationToken);

            return Ok(products);
        }

        /// <summary>
        ///     Returns a single product by its ID number
        /// </summary>
        /// <param name="productId">
        ///     ID number of product to get
        /// </param>
        /// <param name="cancellationToken">
        ///     Token for cancelling the request. This token is provided by the framework itself
        /// </param>
        /// <returns>
        ///     Single product by its ID
        /// </returns>
        [Authorize]
        [HttpGet("GetProductById/{productId:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductDetailViewModel>> GetProductById([FromRoute] int productId, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            AppUser user = await _authService.GetUser(User, cancellationToken);

            ProductDetailViewModel product = await _productService.GetProductById(productId, user.UserId, cancellationToken);

            if (product is null)
            {
                return NotFound();
            }

            return Ok(product);
        }
    }
}
