import TransportFacade from './transport/TransportFacade'
import ApplicationProtocol from './transport/ApplicationProtocol'
import net from 'net'


function main() {
    let transportFacade = new TransportFacade();
    transportFacade.startServer();

    // setTimeout(() => {
    //     sendMessage();
    // }, 1000);    
}

function sendMessage() {
    var client = net.connect({ port: 3000 }, function () {
        console.log('connected to server!');
    });

    let appProtocol: ApplicationProtocol = {
        type: "login",
        body: {
            username: "perlt",
            password: "hej1234"
        }
    }

    client.write(JSON.stringify(appProtocol));

    client.on('data', function (data) {
        console.log(JSON.parse(data.toString()));
        client.end();
    });

    client.on('end', function () {
        console.log('disconnected from server');
    });
}

main();