using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;
using Webshop.Api.Database;
using Webshop.Api.Models.Domain;
using Webshop.Api.Models.Dto.Review;
using Webshop.Api.Models.ViewModel.Review;
using Webshop.Api.Services;

namespace Webshop.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ReviewController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly WebshopContext _context;
        private readonly AuthService _authService;

        public ReviewController(IMapper mapper, WebshopContext context, AuthService authService)
        {
            _mapper = mapper;
            _context = context;
            _authService = authService;
        }

        /// <summary>
        ///     Creates a review to a product in the database
        /// </summary>
        /// <param name="productId">
        ///     ID number of product to review
        /// </param>
        /// <param name="model">
        ///     Information about the review
        /// </param>
        /// <param name="cancellationToken">
        ///     Token for cancelling the request. This token is provided by the framework itself
        /// </param>
        /// <returns>
        ///     Created review
        /// </returns>
        [Authorize]
        [HttpPost("CreateReview/{productId:int}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ReviewViewModel>> CreateReview([FromRoute] int productId, [FromBody] ReviewDto model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Product product = await _context.Products
                .SingleOrDefaultAsync(p => p.ProductId == productId, cancellationToken);

            if (product is null)
            {
                return NotFound();
            }

            AppUser user = await _authService.GetUser(User, cancellationToken);

            bool hasAlreadyReviewed = await _context.Reviews.AnyAsync(r => r.UserId == user.UserId && r.ProductId == product.ProductId);

            if (hasAlreadyReviewed)
            {
                return Unauthorized();
            }

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

            return Created(nameof(CreateReview), viewModel);
        }

        /// <summary>
        ///     Edits an existing review to a product
        /// </summary>
        /// <param name="id">
        ///     ID number of review to edit
        /// </param>
        /// <param name="model">
        ///     Information about the updated review
        /// </param>
        /// <param name="cancellationToken">
        ///     Token for cancelling the request. This token is provided by the framework itself
        /// </param>
        /// <returns>
        ///     The updated reviews
        /// </returns>
        [Authorize]
        [HttpPut("EditReview/{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> EditReview([FromRoute] int id, [FromBody] ReviewDto model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Review review = await _context.Reviews
                .SingleOrDefaultAsync(r => r.ReviewId == id);

            if (review is null)
            {
                return NotFound();
            }

            AppUser user = await _authService.GetUser(User, cancellationToken);

            if (review.UserId != user.UserId)
            {
                return Unauthorized();
            }

            review.Stars = model.Stars;
            review.Body = model.Body;

            await _context.SaveChangesAsync(cancellationToken);

            ReviewViewModel viewModel = _mapper.Map<Review, ReviewViewModel>(review);

            return Ok(viewModel);
        }

        /// <summary>
        ///     Deletes a review to a product
        /// </summary>
        /// <param name="id">
        ///     ID number of review to delete
        /// </param>
        /// <param name="cancellationToken">
        ///     Token for cancelling the request. This token is provided by the framework itself
        /// </param>
        /// <returns>
        ///     No content
        /// </returns>
        [Authorize]
        [HttpDelete("DeleteReview/{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteReview([FromRoute] int id, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Review review = await _context.Reviews
                .SingleOrDefaultAsync(r => r.ReviewId == id);

            if (review is null)
            {
                return NotFound();
            }

            AppUser user = await _authService.GetUser(User, cancellationToken);

            if (review.UserId != user.UserId)
            {
                return Unauthorized();
            }

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync(cancellationToken);

            return NoContent();
        }
    }
}
