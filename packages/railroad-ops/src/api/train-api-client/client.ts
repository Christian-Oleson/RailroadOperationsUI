import axios from "axios";
import {createApiClient} from "../create-api-client";
import {BASE_URL} from "../config";

const trainApiClient = axios.create({
    baseURL: BASE_URL,
})

export const trainAPIRequest = createApiClient(trainApiClient);