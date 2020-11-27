import { insertUser } from "../data/DataFacade";
import ApplicationProtocol from "../transport/ApplicationProtocol";
import { hashText } from "../utils/Utils";

interface CreateUserProtocol {
    username: string,
    password: string,
    role: string
}

export default async function createUserController(protocol: ApplicationProtocol) : Promise<ApplicationProtocol> {
    let loginProtocol: CreateUserProtocol = protocol.body;
    loginProtocol.password = await hashText(loginProtocol.password);
    await insertUser(loginProtocol);
    return {
        type: protocol.type,
        body: "user created",
        status: 200
    }
}


