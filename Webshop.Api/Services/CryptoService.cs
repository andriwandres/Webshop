using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Linq;
using System.Security.Cryptography;

namespace Webshop.Api.Services
{
    public class CryptoService
    {
        public byte[] GenerateSalt()
        {
            byte[] salt = new byte[16];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            return salt;
        }

        public byte[] HashPassword(string password, byte[] salt)
        {
            return KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 32);
        }

        public bool VerifyPassword(byte[] hash, byte[] salt, string password)
        {
            return hash.SequenceEqual(HashPassword(password, salt));
        }
    }
}
