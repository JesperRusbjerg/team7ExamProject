package com.team7.esb.controller;


import com.team7.esb.dto.BankProxyResponseDTO;
import com.team7.esb.dto.CreditScoreDTO;
import com.team7.esb.entity.LogEngine;
import com.team7.esb.utils.UtilsFunctions;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class CreditScoreController {

    private static final String IP = UtilsFunctions.getStringEnvOrDefault("CREDIT-SCORE-IP", "https://www.mdp-creations.dk/creditScoreModule");



    @GetMapping("/credit-score/{cpr}")
    public CreditScoreDTO fetchCreditScore(@PathVariable String cpr) {
        RestTemplate rest = new RestTemplateBuilder().build();
        String url = CreditScoreController.IP + "/api/credit-score/" + cpr;
        CreditScoreDTO response = rest.getForObject(url, CreditScoreDTO.class);

        LogEngine le = new LogEngine();
        le.saveLog("creditScoreMicro", "Creditscore Micro was used");

        return response;
    }


}
