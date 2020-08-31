import * as Types from "./types";
import axios from "axios";
import setAuthToken from "../Utils/SetAuthToken";

// Load User
export const loadUser = () => {
    return async (dispatch) => {
        setAuthToken(localStorage.token);

        try {
            const res = await axios.get("/api/auth");

            dispatch({
                type: Types.USER_LOADED,
                payload: res.data,
            });
        } catch (err) {
            console.error(err);
            dispatch({ type: Types.AUTH_ERROR });
        }
    };
};

// Register User
export const register = (formData) => async (dispatch) => {
    dispatch({ type: Types.SPINNER_SHOW });
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const grapqlQuery = {
        query:
            "mutation ($email: String! $username: String! $password: String!) { createUser(email: $email username: $username password: $password) { token } }",
        variables: {
            email: formData.email,
            password: formData.password,
            username: formData.username,
        },
    };

    try {
        const res = await axios.post(
            "/graphql",
            JSON.stringify(grapqlQuery),
            config,
        );
        //const res = await axios.post("/api/users", formData, config);
        console.log("res", res);
        dispatch({ type: Types.SPINNER_NOSHOW });

        dispatch({
            type: Types.REGISTER_SUCCESS,
            payload: res.data.data.createUser,
        });

        loadUser();
    } catch (err) {
        dispatch({
            type: Types.REGISTER_FAIL,
            payload: err.response.data.msg,
        });
    }
};

// Login User
export const login = (formData) => async (dispatch) => {
    showSpinner();
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    dispatch({ type: Types.SPINNER_SHOW });

    const grapqlQuery = {
        query:
            "mutation ($email: String! $password: String!) { loginUser(email: $email password: $password) { token } }",
        variables: { email: formData.email, password: formData.password },
    };

    try {
        const res = await axios.post(
            "/graphql",
            JSON.stringify(grapqlQuery),
            config,
        );
        console.log(res);

        dispatch({ type: Types.SPINNER_NOSHOW });
        dispatch({
            type: Types.LOGIN_SUCCESS,
            payload: res.data.data.loginUser,
        });

        await loadUser();
    } catch (err) {
        dispatch({
            type: Types.LOGIN_FAIL,
            payload: "Invalid Credentials",
        });
        dispatch({ type: Types.SPINNER_NOSHOW });
    }
};

// Logout
export const logOut = () => (dispatch) => {
    dispatch({ type: Types.LOGOUT });
};

//show spinner
export const showSpinner = () => (dispatch) => {
    dispatch({ type: Types.SPINNER_SHOW });
};

//dont show spinner
export const noShowSpinner = () => (dispatch) => {
    dispatch({ type: Types.SPINNER_NOSHOW });
};

// Clear Errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: Types.CLEAR_ERRORS });
};
