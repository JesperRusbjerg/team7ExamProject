import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;

import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
import java.util.*;

public class LogEngine extends UnicastRemoteObject implements ILogEngine {

    SaveRead sr = new SaveRead();

    HashMap<String, List<String>> logs = sr.readFile();

    List<String> validKeys = new ArrayList<>(Arrays.asList("loginSuccess", "loginUnSuccess", "creditScoreMicro", "proxyMicro"
            , "emailMicro", "loginMicro", "currencyMicro", "statisticsMicro"));

    protected LogEngine() throws IOException, ClassNotFoundException {
    }

    // loginSuccess
    // loginUnSuccess

    // creditScoreMicro
    // proxyMicro

    // emailMicro
    // loginMicro
    // currencyMicro
    // statisticsMicro


    @Override
    public void saveLog(String key, String value) throws Exception {

        if (!validKeys.contains(key)) {
            throw new Exception("Invalid key valid keys are: " + validKeys.toString());
        }

        if (logs.get(key) == null) {
            List<String> newList = new ArrayList<>();
            newList.add(value);
            logs.put(key, newList);
        } else {
            logs.get(key).add(value);
        }
        sr.saveFile(logs);
    }

    @Override
    public List<String> readLogs(String key) throws Exception {
        if (!validKeys.contains(key)) {
            throw new Exception("Invalid key valid keys are: " + validKeys.toString());
        }
        return logs.get(key);
    }

    @Override
    public int succesfullLogins() {
        return logs.get("loginSuccess").size();
    }

    @Override
    public int unSuccesfullLogins() {
        return logs.get("loginUnSuccess").size();
    }

    // creditScoreMicro
    // proxyMicro
    // emailMicro
    // loginMicro
    // currencyMicro
    // statisticsMicro
    @Override
    public String mostPopularMicroService() throws JSONException {

        System.out.println(logs);

        JSONObject json = new JSONObject();
        json.put("creditScore", logs.get("creditScoreMicro").size());
        json.put("proxy", logs.get("proxyMicro").size());
        json.put("email", logs.get("emailMicro").size());
        json.put("login", logs.get("loginMicro").size());
        json.put("currency", logs.get("currencyMicro").size());
        json.put("statistics", logs.get("statisticsMicro").size());

        return json.toString();
    }

    public static void main(String[] args) {

    }
}
