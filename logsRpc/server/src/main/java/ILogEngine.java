import java.io.IOException;
import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.List;

public interface ILogEngine extends Remote {

    public void saveLog(String key, String value) throws IOException, ClassNotFoundException;

    public List<String> readLogs(String key) throws RemoteException;

}
