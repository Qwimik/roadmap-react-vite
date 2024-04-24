
export async function updateStateAction(dispatch, state, query) {
    dispatch({
        type: 'UPDATE_STATE',
        payload: {
            ...state,
            ...query
        }
    })
}