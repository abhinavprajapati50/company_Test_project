import axios from "axios";
import { Update_User_FAIL, Update_User_START, Update_User_SUCCESS, USER_FAIL, USER_START, USER_SUCCESS } from "../ActionTypes";

export const userActions =
    ({ name, job }) =>
        async (dispatch) => {
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

export const userUpdateSuccess =
    ({ id, name, job }) =>
        async (dispatch) => {
            console.log(id, name, job);


            await dispatch({
                type: Update_User_START,
            });

            try {
                const updateTask = await axios.put(
                    `https://reqres.in/api/users/${id}`,
                    {  name, job }
                );
                console.log("----updateTask-----=-==", updateTask);
                if (updateTask) {
                    return dispatch({
                        type: Update_User_SUCCESS,
                        payload: updateTask.data,
                        loading: false,
                    });
                } else {
                    return dispatch({
                        type: Update_User_FAIL,
                        payload: updateTask.data.message,
                        loading: false,
                    });
                }
            } catch (error) {
                console.log(error.message || error);
                return dispatch({
                    type: Update_User_FAIL,
                    payload: error.message || error,
                    loading: false,
                });
            }
        };
