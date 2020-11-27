import { findUser, User } from '../data/DataFacade';


import ApplicationProtocol from "../transport/ApplicationProtocol";
import { hashText, validateHash } from '../utils/Utils';

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
        return {
            type: protocol.type,
            body: dbUser,
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
