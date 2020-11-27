import { verifySessionId } from "../logic/SessionManager";
import ApplicationProtocol from "../transport/ApplicationProtocol";



export default async function verifySessionController(protocol: ApplicationProtocol): Promise<ApplicationProtocol> {
    let sessionId = protocol.body;

    let sessionVerified = verifySessionId(sessionId);
    if (sessionVerified) {
        return {
            type: protocol.type,
            body: "user logged in",
            status: 200
        }
    } else {
        return {
            type: protocol.type,
            body: "user not logged in",
            status: 400
        }
    }
}