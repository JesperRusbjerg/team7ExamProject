package com.team7.esb.controller;


import com.soap.SoapClient;
import com.team7.esb.entity.LogEngine;
import com.team7.esb.entity.LoginLogStats;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
public class CurrencyController {

   SoapClient soap = new SoapClient();



    @GetMapping("/dkk-to-usd")
    public ResponseEntity<Float> dkkToUsd(@RequestParam int amount) {
        LogEngine le = new LogEngine();
        le.saveLog("currencyMicro", "dkkToUsdExchanged");
        return new ResponseEntity<>(soap.dkkToUsdExchange(amount), HttpStatus.OK);
    }

    @GetMapping("/usd-to-dkk")
    public ResponseEntity<Float> usdToDkk(@RequestParam int amount) {
        LogEngine le = new LogEngine();
        le.saveLog("currencyMicro", "UsdToDkkExchanged");
        return new ResponseEntity<>(soap.usdToDkkExchange(amount), HttpStatus.OK);
    }

}