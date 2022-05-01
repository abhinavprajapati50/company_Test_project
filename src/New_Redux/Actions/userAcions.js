import axios from "axios";
import { USER_FAIL, USER_START, USER_SUCCESS } from "../ActionTypes";

export const userActions =
    ({ name, job }) =>
        async (dispatch) => {
            debugger
            await dispatch({ type: USER_START });
            try {


                const result = await axios.post('https://reqres.in/api/users', {
                    name, job
                });

                    console.log(result);
                return dispatch({
                    type: USER_SUCCESS,
                    isLoggedIN: true,
                    payload: result.data
                });
                // }
            } catch (error) {
                return dispatch({
                    type: USER_FAIL,
                    isLoggedIn: false,
                    payload: error || error.message,
                });
            }
        };
