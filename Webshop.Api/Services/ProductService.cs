using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Webshop.Api.Database;
using Webshop.Api.Models.Domain;
using Webshop.Api.Models.ViewModel.Product;

namespace Webshop.Api.Services
{
    public class ProductService
    {
        private readonly IMapper _mapper;
        private readonly WebshopContext _context;

        public ProductService(WebshopContext context, IMapper mapper)
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

        public async Task<ProductDetailViewModel> GetProductById(int productId, int userId, CancellationToken cancellationToken = default)
        {
            Product product = await _context.Products
                .AsNoTracking()
                .Include(p => p.Images)
                .Include(p => p.WishlistItems)
                .Include(p => p.Reviews).ThenInclude(r => r.User)
                .FirstOrDefaultAsync(p => p.ProductId == productId, cancellationToken);

            return _mapper.Map<Product, ProductDetailViewModel>(product, options =>
            {
                options.Items["UserId"] = userId;
            });
        }
    }
}
