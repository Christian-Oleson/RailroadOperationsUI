import {classificationAPIRequest} from "./client";

export function fetchClassifications() {
    return classificationAPIRequest({
        url: `/Classification`,
        method: "GET",
        withCredentials: false,
        headers: {
            "Access-Control-Allow-Origin": "*",
            Accept: "*/*",
        }
    });
}