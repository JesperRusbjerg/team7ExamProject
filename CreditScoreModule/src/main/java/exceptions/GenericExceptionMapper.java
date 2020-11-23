package exceptions;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.Response.StatusType;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class GenericExceptionMapper implements ExceptionMapper<Throwable> {

    private static final Gson GSON = new GsonBuilder().setPrettyPrinting().create();

    @Override
    public Response toResponse(Throwable exception) {
        StatusType statusType = getStatusType(exception);
        Logger.getLogger(GenericExceptionMapper.class.getName()).log(Level.SEVERE, null, exception);
        ExceptionDTO exceptionDTO = new ExceptionDTO(statusType.getStatusCode(), statusType.getReasonPhrase());
        return Response.status(statusType.getStatusCode()).entity(GSON.toJson(exceptionDTO)).type(MediaType.APPLICATION_JSON).build();
    }

    private StatusType getStatusType(Throwable exception) {
        if (exception instanceof InvalidCPRException) {
            return Status.BAD_REQUEST;
        } else if (exception instanceof WebApplicationException) {
            return ((WebApplicationException) exception).getResponse().getStatusInfo();
        }
        return Status.INTERNAL_SERVER_ERROR;
    }
}
