import {config} from "../../config";

export const addPost = async (post) => {
    const baseUrl = config.baseUrl;
    const url = `${baseUrl}posts`;
    const result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post)
    });
    return result.json();
}