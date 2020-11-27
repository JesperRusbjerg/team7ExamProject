import java.rmi.Naming;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;


public class Server {

    public static Registry registry;

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
            System.out.println("Something went wrong");
        }
    }

}
