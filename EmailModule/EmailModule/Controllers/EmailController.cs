using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EmailModule.DTO;

namespace EmailModule.Controllers
{
    public class EmailController : ApiController
    {
        // GET api/email
        public string Get()
        {
            return "Hallo there";
        }

        // POST api/email
        public HttpResponseMessage Post([FromBody] RequestDTO request)
        {
            try
            {
                EmailModule.Facade.EmailFacade.SendEmails(request.subject, request.body, request.sendToList);
                ResponseDTO response = new ResponseDTO();
                response.message = "Mail send";
                return Request.CreateResponse(response);
            }
            catch (Exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError,
                                   "Could not send mail");
            }
        }
    }
}
