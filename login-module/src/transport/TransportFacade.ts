import net from 'net'

import ApplicationProtocol from './ApplicationProtocol'
import ControllerHandler from './../controller/ControllerHandler'


const PORT = process.env.PORT || 3000;

export default class TransportFacade {

    private server: net.Server | null = null;
    private ControllerHandler = new ControllerHandler();

    startServer() {
        this.server = net.createServer((connection) => {

            connection.on("end", () => {
                console.log("client disconnected");
            })

            connection.on("data", async (data) => {
                let appProtocol: ApplicationProtocol = JSON.parse(data.toString());
                let response = await this.ControllerHandler.callController(appProtocol.type, appProtocol);
                console.log(response);
                connection.write(JSON.stringify(response));
                connection.end();
            })
            connection.on("error", (err) => {
            })
        })

        this.server.listen(PORT, () => {
            console.log("server is listening on port: ", PORT);
        })
    }


}