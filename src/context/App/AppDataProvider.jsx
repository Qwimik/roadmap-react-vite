import React, { useMemo, useReducer } from 'react';

import AppDataContext from "./AppDataContext";
import appReducer from "./appReducer";
import appDispatcher from "./appDispatcher";
import initialState from "./initialState";

const AppDataProvider = ({children}) => {
    const [appData, dispatch] = useReducer(appReducer, initialState);
    const appActions = useMemo(() => appDispatcher(dispatch), [dispatch]);

    return (
        <AppDataContext.Provider value={[appData, appActions]}>
            {children}
        </AppDataContext.Provider>
    );
}

export default AppDataProvider;