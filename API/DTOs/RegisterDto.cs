using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class RegisterDto : LoginDto
    {   
        [EmailAddress]
        public string Email { get; set; }
    }
}