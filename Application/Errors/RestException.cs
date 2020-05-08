using System.Net;
using System;
namespace Application.Errors
{
    public class RestException : Exception
    {
        public HttpStatusCode Code;
        public object Errors { get; }
        public RestException(HttpStatusCode code, object errors = null)
        {
            Code = code;
            Errors = errors;
        }


    }
}