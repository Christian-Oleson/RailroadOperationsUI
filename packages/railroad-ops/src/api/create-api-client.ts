import axios, {AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

export function createApiClient(client: AxiosInstance) {
    return function request<T>(config: AxiosRequestConfig): CancelablePromise<T> {
        const source = CancelToken.source();
        const promise = client
            .request<T>({
                ...config,
                cancelToken: source.token,
            })
            .then((res) => res.data)
            .catch((err: Error) => handleApiError(err));

        const cancel = () => source.cancel();

        return Object.assign(promise, { cancel });
    };
}

export type CancelablePromise<T> = Promise<T | void> & { cancel?: () => void };

export interface ApiErrorResponse {
    message?: string;
    _links?: {
        self: {
            href: string;
        };
    };
    _embedded?: {
        errors: {
            message: string;
        }[];
    };
}

export class ApiError extends Error {
    constructor(
        public message: string,
        public status?: number,
        public path?: string,
        public errors: string[] = []
    ) {
        super();
        this.message = message;
        this.status = status;
        this.path = path;
        this.errors = errors;
    }
}

const CancelToken = axios.CancelToken;

function handleApiError(error: Error | AxiosError<ApiErrorResponse>) {
    if (axios.isAxiosError(error)) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        let status: number;
        let data: ApiErrorResponse;
        const config: AxiosRequestConfig = error.config;
        if (error.response) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            ({ status, data } = error.response);
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
        const message =
            typeof data?.message === "string" ? data?.message : error?.message;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
        const errors =
            data?._embedded?.errors instanceof Array
                ? data?._embedded.errors?.map((e: { message: string }) => e?.message)
                : null;
        throw new ApiError(message, status, config.url, errors);
    } else if (axios.isCancel(error)) {
        // The request was cancelled using the CancelToken, so we do nothing
    } else {
        throw new ApiError(error);
    }
}
