package loginModule;

import com.google.gson.JsonObject;

import java.io.IOException;


public class LoginModule {

    private TransportFacade ts = new TransportFacade();

    public LoginModule(String ip, int port) {
        try {
            ts.start(ip, port);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public LoginModule() {
        try {
            ts.start("localhost", 3000);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public boolean createUser(String username, String password) {
        ApplicationProtocol ap = new ApplicationProtocol();
        JsonObject body = new JsonObject();
        body.addProperty("username", username);
        body.addProperty("password", password);
        ap.body = body;
        ap.type = "createUser";

        try {
            ApplicationProtocol response = this.ts.sendMessageAndGetResponse(ap);
            if (response.status != 200) {
                return false;
            }
            return true;
        } catch (IOException e) {
            return false;
        }
    }

    public String login(String username, String password) {
        ApplicationProtocol ap = new ApplicationProtocol();
        JsonObject body = new JsonObject();
        body.addProperty("username", username);
        body.addProperty("password", password);
        ap.body = body;
        ap.type = "login";
        try {
            ApplicationProtocol response = this.ts.sendMessageAndGetResponse(ap);
            if (response.status != 200) {
                return null;
            }
            return (String) response.body;
        } catch (IOException e) {
            return null;
        }
    }

    public boolean verifySessionId(String sessionId) {
        ApplicationProtocol ap = new ApplicationProtocol();
        ap.body = sessionId;
        ap.type = "verifySession";

        try {
            ApplicationProtocol response = this.ts.sendMessageAndGetResponse(ap);
            if (response.status != 200) {
                return false;
            }
            return true;
        } catch (IOException e) {
            return false;
        }
    }
}
