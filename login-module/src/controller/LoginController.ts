import { findUser, User } from '../data/DataFacade';


import ApplicationProtocol from "../transport/ApplicationProtocol";
import { validateHash } from '../utils/Utils';
import {createAndSaveSessionId} from './../logic/SessionManager'

interface LoginProtocol {
    username: string,
    password: string
}

export default async function loginController(protocol: ApplicationProtocol): Promise<ApplicationProtocol> {
    let loginProtocol: LoginProtocol = protocol.body;
    let dbUser = await findUser(loginProtocol.username);
    if (!dbUser) {
        throw new Error("Could not find user");
    }
    if (await validateHash(loginProtocol.password, dbUser.password)) {
        let sessionId = createAndSaveSessionId();
        return {
            type: protocol.type,
            body: sessionId,
            status: 200
        };
    } else {
        return {
            type: protocol.type,
            body: "Username or password is wrong",
            status: 400
        };
    }
}
