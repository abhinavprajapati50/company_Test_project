import { Update_User_FAIL, Update_User_START, Update_User_SUCCESS, USER_FAIL, USER_START, USER_SUCCESS } from "../ActionTypes";

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


export const editUserReducer = (state = initialState, action) => {
    switch (action.type) {
      case Update_User_START:
        return {
          loading: true,
        };
      case Update_User_SUCCESS:
        return {
          ...state,
          loading: false,
          alltask: action.payload,
        };
  
      case Update_User_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };