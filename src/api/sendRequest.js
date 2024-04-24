import { config } from "../config";

export const RESPONSE_TEXT = "text";
export const RESPONSE_JSON = "json";
export const RESPONSE_SUCCESS_STATUS = "success"

export function sendGetRequest(
    dispatch,
    queryParams = {},
    relativeUrl,
    responseType = "json",
    additionalHeaders = {},
) {
    const headers = {
        ...additionalHeaders,
    };
    const url = `${config.baseUrl}${relativeUrl}`;

    return fetch(url, {
        headers,
        method: "GET"
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            console.error(err);
            throw err;
        });
}

export function sendRequest(
    dispatch,
    queryParams = {},
    relativeUrl,
    responseType = "json",
    additionalHeaders = {},
    method = "POST"
) {
    const headers = {
        ...additionalHeaders,
    };
    const url = `${config.baseUrl}${relativeUrl}`;

    return fetch(url, {
        headers,
        method: method,
        body: JSON.stringify({...queryParams})
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            console.error(err);
            throw err;
        });
}