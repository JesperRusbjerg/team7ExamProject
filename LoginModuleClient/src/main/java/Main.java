import loginModule.LoginModule;

public class Main {

    public static void main(String[] args) {
        LoginModule lm = new LoginModule();
        boolean response = lm.verifySessionId("d43323f9-8d29-4294-a65e-129e735a7de4");
        System.out.println(response);
    }
}
