package exceptions;

import java.io.Serializable;

public class ExceptionDTO implements Serializable {

    private final int STATUS_CODE;
    private final String REASON_PHRASE;

    ExceptionDTO(int statusCode, String reasonPhrase) {
        STATUS_CODE = statusCode;
        REASON_PHRASE = reasonPhrase;
    }
}
