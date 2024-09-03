import axios from "axios";
import { createApiClient } from "../create-api-client";
import { BASE_URL } from "../config";

const receiverApiClient = axios.create({
    baseURL: BASE_URL,
})

export const receiverAPIRequest = createApiClient(receiverApiClient);