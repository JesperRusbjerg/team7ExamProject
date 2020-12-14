package com.team7.esb.rpcInterfaces;

import org.json.JSONException;

import java.io.IOException;
import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.List;
import java.util.Map;

public interface ILogEngine extends Remote {

    public void saveLog(String key, String value) throws Exception;

    public List<String> readLogs(String key) throws Exception;

    public int succesfullLogins() throws RemoteException;

    public int unSuccesfullLogins() throws RemoteException;

    public String mostPopularMicroService() throws JSONException, RemoteException;

    public List<String> lastTen() throws RemoteException;

}
