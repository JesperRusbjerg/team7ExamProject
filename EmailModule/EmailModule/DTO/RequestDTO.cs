using System;

namespace EmailModule.DTO { 
    public class RequestDTO
    {
        public string subject { get; set; }
        public string body { get; set; }
        public string[] sendToList{ get; set; }
    }
}