using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;
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

        /// <summary>
        ///     Checks whether an email address is already used by another user in the database
        /// </summary>
        /// <param name="email">
        ///     Email to be checked against the database
        /// </param>
        /// <param name="cancellationToken">
        ///     Token for cancelling the request. This token is provided by the framework itself
        /// </param>
        /// <returns>
        ///     Whether the email address is taken or not
        /// </returns>
        [AllowAnonymous]
        [HttpGet("IsEmailTaken")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<bool>> IsEmailTaken([FromQuery(Name = "email")] string email, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            bool isTaken = await _authService.IsEmailTaken(email, cancellationToken);

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
        ///     Checks a users credentials against the database and returns user information alongside a jwt token.
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
