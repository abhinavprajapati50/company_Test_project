import { USER_FAIL, USER_START, USER_SUCCESS } from "../ActionTypes";

const initialState = {
    currentUser: [],
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_START:
            return {
                loading: true,
            };
        case USER_SUCCESS:
            return {
                ...state,
                loading: false,
                currentUser: action.payload,
            };

        case USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};
