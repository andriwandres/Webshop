using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Webshop.Api.Models.ViewModel.Product;
using Webshop.Api.Services;

namespace Webshop.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ProductController : ControllerBase
    {
        
        private readonly ProductService _productService;

        public ProductController(ProductService productService)
        {
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
        /// <response code="200">
        ///     Returns a list of products
        /// </response>
        [AllowAnonymous]
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
        /// <response code="200">
        ///     Returns product details
        /// </response>
        /// <response code="400">
        ///     If validation fails
        /// </response>
        /// <response code="404">
        ///     If given product doesn't exist
        /// </response>
        [AllowAnonymous]
        [HttpGet("GetProductDetails/{productId:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductDetailViewModel>> GetProductsDetails([FromRoute] int productId, CancellationToken cancellationToken)
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

            ProductDetailViewModel product = await _productService.GetProductDetails(productId, cancellationToken);

            return Ok(product);
        }
    }
}
