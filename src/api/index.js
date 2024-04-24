import {addPost} from "./posts/addPost";
import {deletePost} from "./posts/deletePost";
import {editPost} from "./posts/editPost";
import {fetchPosts, fetchPostsList} from "./posts/fetchPosts";

export const addPostApi = addPost;
export const deletePostApi = deletePost;
export const editPostApi = editPost;
export const fetchPostsApi = fetchPosts;
export const fetchPostsListApi = fetchPostsList;
