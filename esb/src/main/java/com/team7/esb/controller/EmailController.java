package com.team7.esb.controller;

import com.team7.esb.dto.EmailRequestDTO;
import com.team7.esb.dto.EmailResponseDTO;
import com.team7.esb.utils.UtilsFunctions;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class EmailController {

    private static final String IP = UtilsFunctions.getStringEnvOrDefault("EMAIL-IP", "https://emailmodule20201203224626.azurewebsites.net/api/email");

    @PostMapping("send-email")
    public EmailResponseDTO sendEmail(@RequestBody EmailRequestDTO emailRequest) {
        RestTemplate rest = new RestTemplateBuilder().build();
        EmailResponseDTO response = rest.postForObject(EmailController.IP, emailRequest, EmailResponseDTO.class);
        return response;
    }
}
