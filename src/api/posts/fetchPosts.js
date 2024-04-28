import {config} from "../../config";

export const fetchPosts = async () => {
    const baseUrl = config.baseUrl;
    const url = `${baseUrl}posts`;
    const data = await fetch(url);
    return data.json();
}

export const fetchPostsList = async (date = {id: '0'}, postsDataApi = []) => {
    const baseUrl = config.baseUrl;

    // const postsData = await fetchPosts();
    const obj = postsDataApi?.filter((post) => post.id === date.id);
    if (obj.length !== 1) {
        const data = await fetch(`${baseUrl}posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...date
            })
        })
        return data.json();
    } else if(obj.length === 1) {
        const data = await fetch(`${baseUrl}posts/${obj[0]?.id}`);
        return data.json();
    }
}