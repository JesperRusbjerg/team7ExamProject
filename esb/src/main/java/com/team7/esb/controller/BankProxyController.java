package com.team7.esb.controller;


import com.team7.esb.dto.BankProxyRequestDTO;
import com.team7.esb.dto.BankProxyResponseDTO;
import com.team7.esb.entity.LogEngine;
import com.team7.esb.utils.UtilsFunctions;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@RestController
public class BankProxyController {

    private static final String IP = UtilsFunctions.getStringEnvOrDefault("BANK-PROXY-IP", "http://localhost:3000");


    @PostMapping("/request-loan")
    public ResponseEntity<List<BankProxyResponseDTO>> requestLoan(@RequestBody BankProxyRequestDTO loanRequest) {
        RestTemplate rest = new RestTemplateBuilder().build();
        String url = BankProxyController.IP;
        System.out.println(url);
        BankProxyResponseDTO[] response = rest.postForObject(url, loanRequest, BankProxyResponseDTO[].class);

            LogEngine le = new LogEngine();
            le.saveLog("proxyMicro", "Proxy Micro was used");

        return new ResponseEntity<>(Arrays.asList(response), HttpStatus.OK);
    }


}
