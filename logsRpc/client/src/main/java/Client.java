import java.rmi.Naming;

public class Client {

    public static void main(String[] args) throws Exception {
        String remoteEngine = "rmi://localhost/LogServices";

        ILogEngine logEngine = (ILogEngine) Naming.lookup(remoteEngine);


        System.out.println(logEngine.readLogs("a"));

        logEngine.saveLog("q", "b");
        logEngine.saveLog("q", "c");

        System.out.println(logEngine.readLogs("q"));


    }

}
