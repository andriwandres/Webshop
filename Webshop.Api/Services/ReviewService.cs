using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Webshop.Api.Database;
using Webshop.Api.Models.Domain;
using Webshop.Api.Models.Dto.Review;
using Webshop.Api.Models.ViewModel.Review;
using Webshop.Api.SignalR.Events;
using Webshop.Api.SignalR.Hubs;

namespace Webshop.Api.Services
{
    public class ReviewService
    {
        private readonly IMapper _mapper;
        private readonly WebshopContext _context;
        private readonly AuthService _authService;
        private readonly ClaimsPrincipal _user;
        private readonly IHubContext<WebshopHub> _hubContext;

        public ReviewService(IMapper mapper, WebshopContext context, AuthService authService, IHubContext<WebshopHub> hubContext, IHttpContextAccessor httpContext)
        {
            _user = httpContext.HttpContext.User;
            _mapper = mapper;
            _context = context;
            _hubContext = hubContext;
            _authService = authService;
        }

        public IEnumerable<ReviewViewModel> GetReviews(int productId)
        {
            IQueryable<Review> reviews = _context.Reviews
                .Where(r => r.ProductId == productId);

            return reviews.ProjectTo<ReviewViewModel>(_mapper.ConfigurationProvider);
        }

        public async Task<ReviewViewModel> CreateReview(int productId, ReviewDto model, CancellationToken cancellationToken = default)
        {
            Product product = await _context.Products
                .SingleOrDefaultAsync(p => p.ProductId == productId, cancellationToken);

            AppUser user = await _authService.GetUser(_user, cancellationToken);

            Review review = new Review
            {
                User = user,
                Product = product,
                Body = model.Body,
                Stars = model.Stars,
                CreatedAt = DateTime.Now,
            };

            await _context.Reviews.AddAsync(review, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            ReviewViewModel viewModel = _mapper.Map<Review, ReviewViewModel>(review);

            return viewModel;
        }

        public async Task EditReview(int reviewId, ReviewDto model, CancellationToken cancellationToken = default)
        {
            Review review = await _context.Reviews
                .SingleOrDefaultAsync(r => r.ReviewId == reviewId);

            AppUser user = await _authService.GetUser(_user, cancellationToken);

            review.Stars = model.Stars;
            review.Body = model.Body;

            await _context.SaveChangesAsync(cancellationToken);

            ReviewViewModel viewModel = _mapper.Map<Review, ReviewViewModel>(review);

            await _hubContext.Clients.All.SendAsync(SignalREvents.UpdateReview, viewModel, cancellationToken);
        }

        public async Task DeleteReview(int reviewId, CancellationToken cancellationToken = default)
        {
            Review review = await _context.Reviews
                .SingleOrDefaultAsync(r => r.ReviewId == reviewId, cancellationToken);

            AppUser user = await _authService.GetUser(_user, cancellationToken);

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync(cancellationToken);

            await _hubContext.Clients.All.SendAsync(SignalREvents.DeleteReview, reviewId, cancellationToken);
        }

        public async Task<bool> ReviewExists(int reviewId, CancellationToken cancellationToken = default)
        {
            return await _context.Reviews.AnyAsync(r => r.ReviewId == reviewId, cancellationToken);
        }

        public async Task<bool> HasAlreadyReviewed(int productId, CancellationToken cancellationToken = default)
        {
            AppUser user = await _authService.GetUser(_user, cancellationToken);

            return await _context.Reviews.AnyAsync(r => r.UserId == user.UserId && r.ProductId == productId);
        }

        public async Task<bool> IsAuthor(int reviewId, CancellationToken cancellationToken = default)
        {
            AppUser user = await _authService.GetUser(_user, cancellationToken);
            Review review = await _context.Reviews.SingleOrDefaultAsync(r => r.ReviewId == reviewId, cancellationToken);

            return review.UserId == user.UserId;
        }
    }
}
