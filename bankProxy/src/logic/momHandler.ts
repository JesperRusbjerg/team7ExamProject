import { ListenForChannel, MomRequest, MomResponse, sendOnChannel } from "./momFacade";
import settings from '../settings'
import { createUid } from "./utils";


interface responseObject {
    callback: (responseArray: MomResponse[]) => void,
    responseArray: MomResponse[],
    responseCount: number,
    timeoutUid: NodeJS.Timeout
}

export default class MomHandler {
    private messageContainer: { [key: string]: responseObject } = {};

    public start(): void {
        this.listenForResponse();
    }


    public makeLoanRequest(request: MomRequest, callback: (responseArray: MomResponse[]) => void) {
        let uid = createUid();
      
        request.responseChannel = settings.LISTEN_CHANNEL;
        request.uid = uid;

        let timeoutUid = setTimeout(() => {
            let container = this.messageContainer[uid].responseArray;
            delete this.messageContainer[uid];
            callback(container);
        }, settings.RESPONSE_TIMEOUT_TIME);

        this.messageContainer[uid] = {
            callback,
            responseArray: [],
            responseCount: settings.RESPONSES_TO_WAIT_FOR,
            timeoutUid
        }

        sendOnChannel(settings.SEND_CHANNEL, request);
    }


    private listenForResponse() {
        ListenForChannel(settings.LISTEN_CHANNEL, (response) => {
            let container = this.messageContainer[response.uid];
            if (!container) {
                return;
            }

            container.responseArray.push(response);

            if (container.responseArray.length >= container.responseCount) {
                delete this.messageContainer[response.uid];
                clearTimeout(container.timeoutUid);
                container.callback(container.responseArray);
            }
        })
    }
}
