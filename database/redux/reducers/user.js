import { CLEAR_DATA, USER_DATES_STATE_CHANGE, USER_STATE_CHANGE } from "../constants";

const initialState = {
    currentUser: null,
    dates: [],
}

export const user = (state = initialState, action) => {
    switch (action.type) {
        case USER_STATE_CHANGE:
            return {
                ...state,
                currentUser: action.currentUser
            }
        case USER_DATES_STATE_CHANGE:
            return {
                ...state,
                dates: action.dates
            }
        case CLEAR_DATA:
            return initialState
        default:
            return state;
    }
}