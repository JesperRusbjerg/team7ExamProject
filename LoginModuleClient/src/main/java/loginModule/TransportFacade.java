package loginModule;

import com.google.gson.Gson;

import java.io.*;
import java.net.*;


class TransportFacade {

    private Socket clientSocket;
    private PrintWriter out;
    private BufferedReader in;

    void start(String ip, int port) throws IOException {
        this.clientSocket = new Socket(ip, port);

        out = new PrintWriter(clientSocket.getOutputStream(), true);
        in = new BufferedReader(new InputStreamReader(this.clientSocket.getInputStream()));
    }

    ApplicationProtocol sendMessageAndGetResponse(ApplicationProtocol msg) throws IOException {
        Gson gson = new Gson();
        System.out.println("send message :" + gson.toJson(msg));
        this.out.println(gson.toJson(msg));
        ApplicationProtocol response = gson.fromJson(this.in.readLine(), ApplicationProtocol.class);
        return response;
    }

    void stopConnection() throws IOException {
        in.close();
        out.close();
        clientSocket.close();
    }

}
