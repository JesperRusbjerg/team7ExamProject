package com.team7.esb.controller;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;


@RestController
public class StatisticsController {


    @GetMapping("/sucess-login")
    public String successLogin() {

        RestTemplate rest = new RestTemplateBuilder().build();
        String url = "http://localhost:1234/userStats";

        String response = rest.getForObject(url, String.class);
        return response;
    }

    @GetMapping("/micro-distribution-percent")
    public String microDistributionPercent() {

        RestTemplate rest = new RestTemplateBuilder().build();
        String url = "http://localhost:1234/microStats";
        String response = rest.getForObject(url, String.class);
        return response;
    }




}
