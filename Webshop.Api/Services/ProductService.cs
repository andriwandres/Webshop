using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Webshop.Api.Database;
using Webshop.Api.Models.Domain;
using Webshop.Api.Models.Dto.Order;
using Webshop.Api.Models.Dto.Product;
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

        public async Task<IEnumerable<ProductListingViewModel>> GetProducts(ProductQueryDto query, CancellationToken cancellationToken = default)
        {
            // Format filter
            string filter = query.Filter == null
                ? string.Empty 
                : query.Filter.Trim().ToLower();

            Expression<Func<Product, object>> sortPredicate = null;

            // Determine sort predicate
            switch (query.SortCriteria)
            {
                case SortCriteria.Bestseller:
                    sortPredicate = product => -product.Orders.Count();
                    break;
                case SortCriteria.BestRated:
                    sortPredicate = product => -product.Reviews.Average(r => r.Stars);
                    break;
                case SortCriteria.Cheapest:
                    sortPredicate = product => product.Price;
                    break;
                case SortCriteria.MostExpensive:
                    sortPredicate = product => -product.Price;
                    break;
            }

            // Query + map products
            IEnumerable<ProductListingViewModel> products = await _context.Products
                .AsNoTracking()
                .Include(p => p.Orders)
                .Include(p => p.Images)
                .Include(p => p.Reviews)
                .Include(p => p.WishlistItems)
                .Where(p => p.Title.ToLower().Contains(filter))
                .OrderBy(sortPredicate)
                .ProjectTo<ProductListingViewModel>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return products;
        }

        public async Task<ProductDetailViewModel> GetProductDetails(int productId, CancellationToken cancellationToken = default)
        {
            // Query products
            Product productDomain = await _context.Products
                .AsNoTracking()
                .Include(p => p.Images)
                .Include(p => p.WishlistItems)
                .Include(p => p.Reviews).ThenInclude(r => r.User)
                .FirstOrDefaultAsync(p => p.ProductId == productId, cancellationToken);

            // Map products
            ProductDetailViewModel product = _mapper.Map<Product, ProductDetailViewModel>(productDomain);

            return product;
        }

        public async Task Upload(string file)
        {
            ProductImage image = await _context.ProductImages.SingleOrDefaultAsync(pi => pi.ProductImageId == 1);

            image.Image = file;

            _context.ProductImages.Update(image);
            await _context.SaveChangesAsync();
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
