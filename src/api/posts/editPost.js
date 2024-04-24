import {config} from "../../config";

export const editPost = async (data) => {
    const {id} = data;
    const baseUrl = config.baseUrl;
    const url = `${baseUrl}posts/${id}`;

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            ...data
        })
    });
}