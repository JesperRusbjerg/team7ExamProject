import ApplicationProtocol from './../transport/ApplicationProtocol'
import createUserController from './CreateUserController';

import loginController from './LoginController';
import verifySessionController from './VerifySessionController';


export default class ControllerHandler {
    private controllerMap: { [key: string]: (protocol: ApplicationProtocol) => Promise<ApplicationProtocol> } = {};


    constructor() {
        this.addController();
    }

    private addController(): void {
        this.controllerMap["login"] = loginController;
        this.controllerMap["createUser"] = createUserController;
        this.controllerMap["verifySession"] = verifySessionController;
    }

    public async callController(controller: string, protocol: ApplicationProtocol): Promise<ApplicationProtocol> {
        try {
            let response = await this.controllerMap[controller](protocol);
            return response;
        } catch (e) {
            return {
                status: 500,
                type: controller,
                body: e.message
            }
        }
    }
}