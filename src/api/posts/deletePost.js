import {config} from "../../config";

export const deletePost = (data, taskIndex) => {
    const {id, tasks} = data;
    const baseUrl = config.baseUrl;
    const url = `${baseUrl}posts/${id}`;
    tasks.splice(taskIndex, 1);
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            tasks: [...tasks]
        })
    });
}