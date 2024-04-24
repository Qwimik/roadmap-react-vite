import {useContext} from "react";

import AppDataContext from "../context/App/AppDataContext";

export default function useAppContext() {
    const [appData, appActions] = useContext(AppDataContext);
    const {dispatch: appDispatch} = appActions;
    return {
        ...appData,
        ...appActions,
        appDispatch
    }
}