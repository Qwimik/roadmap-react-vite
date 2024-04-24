import {updateStateAction} from "./app/actions";

const dispatchMapper = {
    updateState: updateStateAction,
}
export default function appDispatcher(dispatch) {
    const dispatchers = { dispatch };
    Object.keys(dispatchMapper).forEach((dispatchName) => {
        dispatchers[dispatchName] = dispatchMapper[dispatchName].bind(null, dispatch);
    });
    return dispatchers;
}