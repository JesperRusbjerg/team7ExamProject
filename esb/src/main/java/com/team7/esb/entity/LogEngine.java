package com.team7.esb.entity;

import com.team7.esb.rpcInterfaces.ILogEngine;
import com.team7.esb.utils.UtilsFunctions;

import java.net.MalformedURLException;
import java.rmi.Naming;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;

public class LogEngine {

    public ILogEngine logEngine;

    public LogEngine() throws RemoteException, NotBoundException, MalformedURLException {
        String remoteEngine = UtilsFunctions.getStringEnvOrDefault("LOGGING-IP", "rmi://localhost/LogServices");
        logEngine = (ILogEngine) Naming.lookup(remoteEngine);
    }

}
