using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
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
        private readonly ProductService _productService;
        private readonly ReviewService _reviewService;

        public ReviewController(ProductService productService, ReviewService reviewService)
        {
            _reviewService = reviewService;
            _productService = productService;
        }

        /// <summary>
        ///     Returns a list of reviews for a given product
        /// </summary>
        /// <param name="productId">
        ///     ID number of product to get reviews of
        /// </param>
        /// <returns>
        ///     List of reviews for given product
        /// </returns>
        /// <response code="200">
        ///     Returns list of review for given product
        /// </response>
        /// <response code="400">
        ///     If validation fails
        /// </response>
        [AllowAnonymous]
        [HttpGet("GetReviews/{productId:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<IEnumerable<ReviewViewModel>> GetReviews([FromRoute] int productId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IEnumerable<ReviewViewModel> reviews = _reviewService.GetReviews(productId);

            return Ok(reviews);
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
        /// <response code="200">
        ///     Returns the created review
        /// </response>
        /// <response code="400">
        ///     If validation fails
        /// </response>
        /// <response code="401">
        ///     If the user is not the author of the review
        /// </response>
        /// <response code="404">
        ///     If given product doesn't exist
        /// </response>
        [Authorize]
        [HttpPost("CreateReview/{productId:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ReviewViewModel>> CreateReview([FromRoute] int productId, [FromBody] ReviewDto model, CancellationToken cancellationToken)
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

            bool hasAlreadyReviewed = await _reviewService.HasAlreadyReviewed(productId, cancellationToken);

            if (hasAlreadyReviewed)
            {
                return Unauthorized();
            }
            
            ReviewViewModel review = await _reviewService.CreateReview(productId, model, cancellationToken);

            return Ok(review);
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
        /// <response code="204">
        ///     Edit of review was successfull
        /// </response>
        /// <response code="400">
        ///     If validation fails
        /// </response>
        /// <response code="401">
        ///     If the user is not the author of the review 
        /// </response>
        /// <response code="404">
        ///     If give review doesn't exist
        /// </response>
        [Authorize]
        [HttpPut("EditReview/{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> EditReview([FromRoute] int id, [FromBody] ReviewDto model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            bool reviewExists = await _reviewService.ReviewExists(id, cancellationToken);

            if (!reviewExists)
            {
                return NotFound();
            }

            bool isAuthor = await _reviewService.IsAuthor(id, cancellationToken);

            if (!isAuthor)
            {
                return Unauthorized();
            }

            await _reviewService.EditReview(id, model, cancellationToken);

            return NoContent();
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
        /// <response code="204">
        ///     Deletion of review was successfull
        /// </response>
        /// <response code="400">
        ///     If validation fails
        /// </response>
        /// <response code="401">
        ///     If the user is not the author of the review
        /// </response>
        /// <response code="404">
        ///     If given review doesn't exist
        /// </response>
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

            bool reviewExists = await _reviewService.ReviewExists(id, cancellationToken);

            if (!reviewExists)
            {
                return NotFound();
            }

            bool isAuthor = await _reviewService.IsAuthor(id, cancellationToken);

            if (!isAuthor)
            {
                return Unauthorized();
            }

            await _reviewService.DeleteReview(id, cancellationToken);

            return NoContent();
        }
    }
}
