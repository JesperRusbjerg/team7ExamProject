package com.team7.esb.entity;

import com.team7.esb.rpcInterfaces.ILogEngine;
import com.team7.esb.utils.UtilsFunctions;

import java.net.MalformedURLException;
import java.rmi.Naming;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;

public class LogEngine {

    public ILogEngine logEngine;

    public LogEngine()  {
        String remoteEngine = UtilsFunctions.getStringEnvOrDefault("LOGGING-IP", "rmi://localhost/LogServices");
        try {
            logEngine = (ILogEngine) Naming.lookup(remoteEngine);
        } catch (NotBoundException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (RemoteException e) {
            e.printStackTrace();
        }
    }

    public void saveLog(String key, String value){

        try {
            logEngine.saveLog(key, value);
        } catch (Exception e) {
        }
    };

}
