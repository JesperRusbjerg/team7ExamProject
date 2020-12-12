package com.team7.esb.controller;

import com.team7.esb.dto.BankProxyResponseDTO;
import com.team7.esb.dto.LogRequestDTO;
import com.team7.esb.entity.LoginLogStats;
import com.team7.esb.rpcInterfaces.ILogEngine;
import org.json.JSONException;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.net.MalformedURLException;
import java.rmi.Naming;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

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
