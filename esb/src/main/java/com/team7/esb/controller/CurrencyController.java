package com.team7.esb.controller;


import com.baeldung.soap.ws.client.generated.SoapClient;
import com.team7.esb.entity.LoginLogStats;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
public class CurrencyController {

   SoapClient soap = new SoapClient();

    @GetMapping("/dkk-to-usd")
    public ResponseEntity<Float> dkkToUsd(@RequestParam int amount) {

        System.out.println("hej");
        System.out.println(amount);
        System.out.println();

        Float test = soap.dkkToUsdExchange(amount);

        Float x = Float.valueOf(33);

        return new ResponseEntity<>(x, HttpStatus.OK);
    }

//    @GetMapping("/usd-to-dkk")
//    public ResponseEntity<Float> usdToDkk(@RequestParam int amount) {
//
//        return new ResponseEntity<>(soap.usdToDkkExchange(amount), HttpStatus.OK);
//    }

}