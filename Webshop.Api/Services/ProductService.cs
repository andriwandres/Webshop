using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Webshop.Api.Database;
using Webshop.Api.Models.Domain;
using Webshop.Api.Models.Dto.Order;
using Webshop.Api.Models.ViewModel.Product;

namespace Webshop.Api.Services
{
    public class ProductService
    {
        private readonly IMapper _mapper;
        private readonly WebshopContext _context;

        public ProductService(IMapper mapper, WebshopContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<ProductListingViewModel>> GetProducts(CancellationToken cancellationToken = default)
        {
            IEnumerable<ProductListingViewModel> products = await _context.Products
                .AsNoTracking()
                .Include(p => p.Images)
                .Include(p => p.Reviews)
                .Include(p => p.WishlistItems)
                .ProjectTo<ProductListingViewModel>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return products;
        }

        public async Task<ProductDetailViewModel> GetProductDetails(int productId, CancellationToken cancellationToken = default)
        {
            Product productDomain = await _context.Products
                .AsNoTracking()
                .Include(p => p.Images)
                .Include(p => p.WishlistItems)
                .Include(p => p.Reviews).ThenInclude(r => r.User)
                .FirstOrDefaultAsync(p => p.ProductId == productId, cancellationToken);

            ProductDetailViewModel product = _mapper.Map<Product, ProductDetailViewModel>(productDomain);

            return product;
        }

        public async Task<bool> ProductExists(int productId, CancellationToken cancellationToken = default)
        {
            return await _context.Products.AnyAsync(p => p.ProductId == productId, cancellationToken);
        }

        public async Task<bool> HasQuantity(OrderDto order, CancellationToken cancellationToken = default)
        {
            Product product = await _context.Products.SingleOrDefaultAsync(p => p.ProductId == order.ProductId, cancellationToken);
            
            return product.Quantity > order.Quantity;
        }
    }
}
