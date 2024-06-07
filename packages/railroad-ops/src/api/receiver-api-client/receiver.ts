import {receiverAPIRequest} from "./client";

export function fetchReceivers() {
    return receiverAPIRequest({
        url: `/Receiver`,
        method: "GET",
        withCredentials: false,
        headers: {
            "Access-Control-Allow-Origin": "*",
            Accept: "*/*",
        }
    })
}

export function deleteReceiver(receiverId: number) {
    return receiverAPIRequest({
        url: `/Receiver/${receiverId}`,
        method: "DELETE",
        withCredentials: false,
        headers: {
            "Access-Control-Allow-Origin": "*",
            Accept: "*/*",
        }
    })
}