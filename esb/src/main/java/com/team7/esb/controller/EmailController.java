package com.team7.esb.controller;

import com.team7.esb.dto.BankProxyResponseDTO;
import com.team7.esb.dto.EmailRequestDTO;
import com.team7.esb.dto.EmailResponseDTO;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;

@RestController
public class EmailController {

    private static final String URL = "https://emailmodule20201203224626.azurewebsites.net/api/email";

    @PostMapping("send-email")
    public EmailResponseDTO sendEmail(@RequestBody EmailRequestDTO emailRequest) {
        RestTemplate rest = new RestTemplateBuilder().build();
        EmailResponseDTO response = rest.postForObject(EmailController.URL, emailRequest, EmailResponseDTO.class);
        return response;
    }


}
