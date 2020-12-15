package com.team7.esb.controller;

import com.team7.esb.rpcInterfaces.ILogEngine;

import java.rmi.Naming;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;


public class Server {

    public static Registry registry;

    //Keys to log on:
    // loginSuccess
    // loginUnSuccess

    // creditScoreMicro
    // proxyMicro

    // emailMicro
    // loginMicro
    // currencyMicro
    // statisticsMicro


    public static void main(String[] args) {
        try{
            System.out.println("Server has started");

            registry = LocateRegistry.createRegistry(1099);

            String logRMIPoint = "LogServices";
            ILogEngine remoteLogEngine = new LogEngine();
            System.out.println("RMI registry created ");

            Naming.rebind("//localhost/" + logRMIPoint, remoteLogEngine);
            System.out.println("Engine " + logRMIPoint + " bound in registry");
        }catch(Exception e){
            e.printStackTrace();
            System.out.println("Something went wrong");
        }
    }

}
