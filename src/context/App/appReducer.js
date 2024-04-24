import {updateStateReducer} from "./app/reducers";
export default function appReducer(state, { type, payload }) {
    return updateStateReducer(state, payload);
}