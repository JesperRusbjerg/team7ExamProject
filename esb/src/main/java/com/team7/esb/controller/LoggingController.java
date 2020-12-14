package com.team7.esb.controller;

import com.team7.esb.dto.LogRequestDTO;
import com.team7.esb.entity.LoginLogStats;
import com.team7.esb.exceptions.UnauthorizedUser;
import com.team7.esb.rpcInterfaces.ILogEngine;
import com.team7.esb.utils.UtilsFunctions;
import org.json.JSONException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.MalformedURLException;
import java.rmi.Naming;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.util.ArrayList;
import java.util.List;

@RestController
public class LoggingController {

    String remoteEngine = UtilsFunctions.getStringEnvOrDefault("LOGGING_IP", "rmi://localhost/LogServices");
    ILogEngine logEngine;

    {
        try {
            logEngine = (ILogEngine) Naming.lookup(remoteEngine);
        } catch (NotBoundException | MalformedURLException | RemoteException e) {
            e.printStackTrace();
        }
    }


    @PostMapping("/post-log")
    public void postLog(@RequestBody LogRequestDTO log) {
        try {
            logEngine.saveLog(log.key, log.log);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @GetMapping("/get-login-logs")
    public ResponseEntity<LoginLogStats> getLoginStats(@RequestHeader("session-id") String sessionId) {
        try {
            UtilsFunctions.checkIfUserHasAccess(sessionId);
        } catch (UnauthorizedUser unauthorizedUser) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        LoginLogStats ln = new LoginLogStats();

        try {
            ln.successfullLogins = logEngine.succesfullLogins();
            ln.unsuccessfullLogins = logEngine.unSuccesfullLogins();
        } catch (RemoteException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(ln, HttpStatus.OK);

    }

    @GetMapping("/ten-last-logs")
    public ResponseEntity<List<String>> lastTenLogs(@RequestHeader("session-id") String sessionId) {
        try {
            UtilsFunctions.checkIfUserHasAccess(sessionId);
        } catch (UnauthorizedUser unauthorizedUser) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
        }
        List<String> res = new ArrayList<>();
        try {
            res = logEngine.lastTen();
        } catch (RemoteException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/microservice-logs")
    public ResponseEntity<String> microServiceLogs(@RequestHeader("session-id") String sessionId) {
        try {
            UtilsFunctions.checkIfUserHasAccess(sessionId);
        } catch (UnauthorizedUser unauthorizedUser) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        String res = null;
        try {
            res = logEngine.mostPopularMicroService();
        } catch (RemoteException | JSONException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

}
