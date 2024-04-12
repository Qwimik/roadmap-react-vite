import {useReducer} from "react";
import appReducer from "./appReducer.js";
import initialState from "./initialState.js";
import AppDataContext from "./AppDataContext.jsx";

const AppDataProvider = ({children}) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppDataContext.Provider value={{state, dispatch}}>
            {children}
        </AppDataContext.Provider>
    )
}

export default AppDataProvider;