package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import facade.CreditFacade;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/credit-score")
public class CreditResource {

    private static final Gson GSON = new GsonBuilder().setPrettyPrinting().create();

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public String test() {
        return "{\"msg\":\"Server is up!\"}";
    }

    @Path("/{CPR}")
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public String getAllCourses(@PathParam("CPR") String CPR) {
        return GSON.toJson(CreditFacade.calculateCreditScore(CPR));
    }
}
