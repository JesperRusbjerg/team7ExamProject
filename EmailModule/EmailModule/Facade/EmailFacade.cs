using System;
using System.Collections.Generic;
using System.Text;
using System.Net.Mail;

namespace EmailModule.Facade
{
    class EmailFacade
    {
        private static string email = "cphteam7@gmail.com";
        private static string password = "DuenFlyverPaaStoreVinger";
        private static string host = "smtp.gmail.com";

        public static void SendEmails(string subject, string body, string[] sendTo)
        {
            MailMessage mail = new MailMessage();
            SmtpClient smtpServer = new SmtpClient(EmailFacade.host);
            mail.From = new MailAddress(EmailFacade.email);
            foreach (string email in sendTo)
            {
                mail.To.Add(email);
            }
            mail.Subject = subject;
            mail.Body = body;
            smtpServer.Port = 587;
            smtpServer.Credentials = new System.Net.NetworkCredential(EmailFacade.email, EmailFacade.password);
            smtpServer.EnableSsl = true;

            smtpServer.Send(mail);

        }



    }
}
