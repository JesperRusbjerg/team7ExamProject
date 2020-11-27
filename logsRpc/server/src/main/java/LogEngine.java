import java.io.IOException;
import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;

import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class LogEngine extends UnicastRemoteObject implements  ILogEngine{

    SaveRead sr = new SaveRead();

    HashMap<String, List<String>> logs = sr.readFile();

    protected LogEngine() throws IOException, ClassNotFoundException {
    }

    @Override
    public void saveLog(String key, String value) throws IOException, ClassNotFoundException {

        if(logs.get(key) == null){
            List<String> newList = new ArrayList<>();
            newList.add(value);
            logs.put(key, newList);
        }else{
        logs.get(key).add(value);
        }
        sr.saveFile(logs);
    }

    @Override
    public List<String> readLogs(String key) {

        return (List<String>) logs.get(key);

    }
}
