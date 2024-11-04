using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SQL_Server.DTOs
{
    public class AdminDTO_Login
    {
        public required string UserId { get; set; }
        public required string Password { get; set; }
    }
}