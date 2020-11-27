package exceptions;

public class InvalidCPRException extends Exception {

    public InvalidCPRException() {
        super("400 - Invalid CPR Number");
    }

    public InvalidCPRException(String message) {
        super(message);
    }

}
