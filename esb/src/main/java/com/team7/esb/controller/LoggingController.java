package com.team7.esb.controller;

import com.team7.esb.dto.LogRequestDTO;
import com.team7.esb.entity.LoginLogStats;
import com.team7.esb.rpcInterfaces.ILogEngine;
import com.team7.esb.utils.UtilsFunctions;
import org.json.JSONException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
    public LoginLogStats getLoginStats() {

        LoginLogStats ln = new LoginLogStats();

        try {
            ln.successfullLogins = logEngine.succesfullLogins();
            ln.unsuccessfullLogins = logEngine.unSuccesfullLogins();
        } catch (RemoteException e) {
            e.printStackTrace();
        }

        return ln;

    }

    @GetMapping("/ten-last-logs")
    public List<String> lastTenLogs() {

        List<String> res = new ArrayList<>();
        try {
            res = logEngine.lastTen();
        } catch (RemoteException e) {
            e.printStackTrace();
        }
        return res;
    }

    @GetMapping("/microservice-logs")
    public String microServiceLogs() {
        String res = null;
        try {
             res = logEngine.mostPopularMicroService();
        } catch (RemoteException | JSONException e) {
            e.printStackTrace();
        }
        return res;
    }

}
