// import {fetchPostsApi, fetchPostsListApi} from "../../../api";
// import {isEmpty} from "lodash";
//
// export async function fetchPostsAction(dispatch, query) {
//     try {
//         const res = await fetchPostsApi(dispatch, query);
//         if (!isEmpty(res?.data)) {
//             dispatch({
//                 type: "UPDATE_POSTS_LIST",
//                 payload: res,
//             });
//         } else {
//             dispatch({
//                 type: "UPDATE_POSTS_LIST",
//                 payload: {},
//             });
//         }
//     } catch (error) {
//         console.error(error);
//     }
// }