using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Webshop.Api.Database;
using Webshop.Api.Models.Domain;
using Webshop.Api.Models.ViewModel.Product;

namespace Webshop.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ProductController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly WebshopContext _context;

        public ProductController(IMapper mapper, WebshopContext context)
        {
            _mapper = mapper;
            _context = context;
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
        [AllowAnonymous]
        [HttpGet("GetProducts")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<ProductListingViewModel>>> GetProducts(CancellationToken cancellationToken)
        {
            IEnumerable<ProductListingViewModel> products = await _context.Products
                .AsNoTracking()
                .Include(p => p.Images)
                .Include(p => p.Reviews)
                .Include(p => p.WishlistItems)
                .ProjectTo<ProductListingViewModel>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

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

            Product productDomain = await _context.Products
                .AsNoTracking()
                .Include(p => p.Images)
                .Include(p => p.WishlistItems)
                .Include(p => p.Reviews).ThenInclude(r => r.User)
                .FirstOrDefaultAsync(p => p.ProductId == productId, cancellationToken);

            ProductDetailViewModel product = _mapper.Map<Product, ProductDetailViewModel>(productDomain);

            if (product is null)
            {
                return NotFound();
            }

            return Ok(product);
        }
    }
}
