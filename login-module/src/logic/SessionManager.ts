import { time } from "console";
import { create } from "domain";


const sessionSet = new Set<string>();


function createUid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export function verifySessionId(sessionId: string): boolean {
    return sessionSet.has(sessionId);
}

export function createAndSaveSessionId(): string {
    let uid = createUid();
    sessionSet.add(uid);
    // let timeoutTime = 1000 * 60 / 1 min;
    let timeoutTimer = 1000 * 60 * 60 * 24 * 3 // 3 days;
    setTimeout(() => {
        sessionSet.delete(uid);
    }, timeoutTimer);  
    return uid;
}