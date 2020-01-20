using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcCrud_1.Models
{
    public class UsersModel
    {
        public int UserID { get; set; }
        public string Firstname { get; set; }        
        public string Middlename { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
    }
    public class ResponseDTO
    {
        public string Status { get; set; }
        public string Message { get; set; }

    }

    public enum Response
    {
        Failed = 0,
        Success = 1,

    }
}