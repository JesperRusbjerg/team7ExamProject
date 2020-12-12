import java.rmi.Naming;

public class Client {

    public static void main(String[] args) throws Exception {


        String remoteEngine = "rmi://localhost/LogServices";
        ILogEngine logEngine = (ILogEngine) Naming.lookup(remoteEngine);

        logEngine.saveLog("currencyMicro", "gg");

        System.out.println(logEngine.mostPopularMicroService());

    }

}
