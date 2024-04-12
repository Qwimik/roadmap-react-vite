const appReducer = (state, action) => {
    switch (action.type) {
        default:
            return {
                ...state,
                ...action.payload,
            }
    }
}

export default appReducer;