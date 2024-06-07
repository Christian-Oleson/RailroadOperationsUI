import {trainAPIRequest} from "./client";
import {Train} from "./trainModels";

export function fetchTrains() {

    return trainAPIRequest({
        url: `/Train`,
        method: "GET",
        withCredentials: false,
        headers: {
            "Access-Control-Allow-Origin": "*",
            Accept: "*/*",
        }
    });
}

export function fetchCars(trainId: number) {

        return trainAPIRequest({
            url: `/Train/${trainId}`,
            method: "GET",
            withCredentials: false,
            headers: {
                "Access-Control-Allow-Origin": "*",
                Accept: "*/*",
            }
        });
}

export function deleteTrain(trainId: number) {

        return trainAPIRequest({
            url: `/Train/${trainId}`,
            method: "DELETE",
            withCredentials: false,
            headers: {
                "Access-Control-Allow-Origin": "*",
                Accept: "*/*",
            }
        });
}

export function addTrain(train: Train) {

    return trainAPIRequest({
        url: `/Train`,
        method: "POST",
        withCredentials: false,
        headers: {
            "Access-Control-Allow-Origin": "*",
            Accept: "*/*",
        },
        data: train
    });
}