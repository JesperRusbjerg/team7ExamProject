package com.team7.esb.controller;

import com.team7.esb.entity.LogEngine;
import com.team7.esb.exceptions.UnauthorizedUser;
import com.team7.esb.utils.UtilsFunctions;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;


@RestController
public class StatisticsController {

    private final String IP = UtilsFunctions.getStringEnvOrDefault("STAT-IP", "http://localhost:1234");



    @GetMapping("/sucess-login")
    public ResponseEntity<String> successLogin(@RequestHeader("session-id") String sessionId) {
        try {
            UtilsFunctions.checkIfUserHasAccess(sessionId);
        } catch (UnauthorizedUser unauthorizedUser) {
            return new ResponseEntity<>("Could not verify user", HttpStatus.BAD_REQUEST);
        }
        LogEngine le = new LogEngine();
        le.saveLog("statisticsMicro", "Login stats fetched");

        RestTemplate rest = new RestTemplateBuilder().build();
        String url = this.IP + "/userStats";

        String response = rest.getForObject(url, String.class);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/micro-distribution-percent")
    public ResponseEntity<String> microDistributionPercent(@RequestHeader("session-id") String sessionId) {
        try {
            UtilsFunctions.checkIfUserHasAccess(sessionId);
        } catch (UnauthorizedUser unauthorizedUser) {
            return new ResponseEntity<>("Could not verify user", HttpStatus.BAD_REQUEST);
        }
        LogEngine le = new LogEngine();
        le.saveLog("statisticsMicro", "Micro stats fetched");
        RestTemplate rest = new RestTemplateBuilder().build();
        String url = this.IP + "/microStats";
        String response = rest.getForObject(url, String.class);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


}
