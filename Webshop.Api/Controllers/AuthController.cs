using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using Webshop.Api.Models.Domain;
using Webshop.Api.Models.Dto.User;
using Webshop.Api.Models.ViewModel.User;
using Webshop.Api.Services;

namespace Webshop.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [Authorize]
        [HttpGet("Authenticate")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<AuthenticatedUser>> Authenticate(CancellationToken cancellationToken)
        {
            AuthenticatedUser user = await _authService.Authenticate(User, cancellationToken);

            return Ok(user);
        }

        /// <summary>
        ///     Checks whether an email address is already used by another user in the database
        /// </summary>
        /// <param name="query">
        ///     Query parameter containing the email address to check against the database
        /// </param>
        /// <param name="cancellationToken">
        ///     Token for cancelling the request. This token is provided by the framework itself
        /// </param>
        /// <returns>
        ///     Whether the email address is taken or not
        /// </returns>
        /// <response code="200">
        ///     Returns the boolean result
        /// </response>
        /// <response code="400">
        ///     If provided query parameter is not an email address
        /// </response>
        [AllowAnonymous]
        [HttpGet("IsEmailTaken")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<bool>> IsEmailTaken([FromQuery] EmailQueryDto query, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            bool isTaken = await _authService.IsEmailTaken(query.Email, cancellationToken);

            return Ok(isTaken);
        }

        /// <summary>
        ///     Creates a new application user in the database
        /// </summary>
        /// <param name="model">
        ///     User information for registration
        /// </param>
        /// <param name="cancellationToken">
        ///     Token for cancelling the request. This token is provided by the framework itself
        /// </param>
        /// <returns>
        ///     No content
        /// </returns>
        /// <response code="204">
        ///     Registration was successful
        /// </response>
        /// <response code="400">
        ///     If validation fails or email address is already taken
        /// </response>
        [AllowAnonymous]
        [HttpPost("Register")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Register([FromBody] RegisterDto model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            bool emailTaken = await _authService.IsEmailTaken(model.Email, cancellationToken);

            if (emailTaken)
            {
                return BadRequest($"Email ({model.Email}) is already taken");
            }

            await _authService.Register(model, cancellationToken);

            return NoContent();
        }

        /// <summary>
        ///     Checks a users credentials against the database and returns user information alongside a valid JWT token.
        /// </summary>
        /// <param name="model">
        ///     Login credentials
        /// </param>
        /// <param name="cancellationToken">
        ///     Token for cancelling the request. This token is provided by the framework itself
        /// </param>
        /// <returns>
        ///     User information + Valid JWT Token
        /// </returns>
        /// <response code="200">
        ///     Returns user information alongside a valid JWT token
        /// </response>
        /// <response code="400">
        ///     If validation fails or credentials are incorrect
        /// </response>
        [AllowAnonymous]
        [HttpPost("Login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<AuthenticatedUser>> Login([FromBody] LoginDto model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            AuthenticatedUser user = await _authService.Login(model, cancellationToken);

            if (user == null)
            {
                return BadRequest("Email or password is incorrect");
            }

            return Ok(user);
        }
    }
}
