import axios from "axios";
import { LOGIN_FAIL, LOGIN_START, LOGIN_SUCCESS } from "../ActionTypes";

export const LoginAction =
  ({ email, password }) =>
    async (dispatch) => {
      debugger
      await dispatch({ type: LOGIN_START });
      try {
      
console.log(email, password);
        const result = await axios.post('https://reqres.in/api/login', {
          email, password
        });
       
          console.log("-----------------------==========<<<<<<<", result.data);

        localStorage.setItem("token", result.data.token);
          return dispatch({
            type: LOGIN_SUCCESS,
            isLoggedIN: true,
            payload: result.data.token
          });
        
        // }
      } catch (error) {
        return dispatch({
          type: LOGIN_FAIL,
          isLoggedIn: false,
          payload: error || error.message,
        });
      }
    };
