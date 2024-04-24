export function updateStateReducer(state, query) {
    return {
        ...state,
        ...query
    }
}