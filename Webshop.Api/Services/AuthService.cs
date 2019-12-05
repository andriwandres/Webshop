using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Webshop.Api.Configuration;
using Webshop.Api.Database;
using Webshop.Api.Models.Domain;
using Webshop.Api.Models.Dto.User;
using Webshop.Api.Models.ViewModel.User;

namespace Webshop.Api.Services
{
    public class AuthService
    {
        private readonly IMapper _mapper;
        private readonly WebshopContext _context;
        private readonly JwtSettings _jwtSettings;
        private readonly CryptoService _cryptoService;

        public AuthService(WebshopContext context, CryptoService cryptoService, IMapper mapper, IOptions<JwtSettings> jwtSettings)
        {
            _mapper = mapper;
            _context = context;
            _cryptoService = cryptoService;
            _jwtSettings = jwtSettings.Value;
        }

        public async Task<AppUser> GetUser(ClaimsPrincipal principal, CancellationToken cancellationToken = default)
        {
            // Extract user id from NameIdentifier claim
            string id = principal.FindFirstValue(ClaimTypes.NameIdentifier);

            if (id == null)
            {
                return null;
            }

            return await _context.Users
                .FirstAsync(u => u.UserId == int.Parse(id));
        }

        public async Task Register(RegisterDto model, CancellationToken cancellationToken = default)
        {
            AppUser user = _mapper.Map<RegisterDto, AppUser>(model);

            // Generate salt + password hash
            byte[] salt = _cryptoService.GenerateSalt();
            byte[] hash = _cryptoService.HashPassword(model.Password, salt);

            user.PasswordHash = hash;
            user.PasswordSalt = salt;
            user.CreatedAt = DateTime.Now;

            // Save user to database
            await _context.Users.AddAsync(user, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task<AuthenticatedUser> Login(LoginDto model, CancellationToken cancellationToken = default)
        {
            // Look for user with given email address
            AppUser user = await _context.Users
                .AsNoTracking()
                .SingleOrDefaultAsync(u => u.Email.ToLower() == model.Email.ToLower(), cancellationToken);

            if (user == null)
            {
                return null;
            }

            // Verify that the password is correct
            bool passwordCorrect = _cryptoService.VerifyPassword(user.PasswordHash, user.PasswordSalt, model.Password);

            if (!passwordCorrect)
            {
                return null;
            }

            // Generate jwt access token
            string token = GenerateToken(user);

            AuthenticatedUser result = new AuthenticatedUser
            {
                User = user,
                Token = token,
            };

            return result;
        }

        public async Task<bool> IsEmailTaken(string email, CancellationToken cancellationToken = default)
        {
            return await _context.Users.AnyAsync(u => u.Email.ToLower() == email.ToLower(), cancellationToken);
        }

        private string GenerateToken(AppUser user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSettings.Secret);

            // Configure claims to build the token
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.GivenName, user.Firstname),
                    new Claim(ClaimTypes.Surname, user.Lastname),
                    new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };

            // Create the token
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
