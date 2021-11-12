import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    SET_LOGGED_IN: "SET_LOGGED_IN",
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    DISPLAY_ERROR_MESSAGE: "DISPLAY_ERROR_MESSAGE",
    CLEAR_ERROR_MESSAGE: "CLEAR_ERROR_MESSAGE"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        errorMessage: null
    });
    const history = useHistory();
    
    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.SET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    errorMessage: null,
                });
            }
            case AuthActionType.CLEAR_ERROR_MESSAGE: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorMessage: null,
                });
            }
            case AuthActionType.DISPLAY_ERROR_MESSAGE: {
                return setAuth({
                    user: null,
                    loggedIn: false, 
                    errorMessage: payload.errorMessage
                });
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorMessage: null
                });
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    errorMessage: null
                });
            }
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    errorMessage: null
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    errorMessage: null
                });
            }
            default:
                return auth;
        }
    }

    auth.clearErrorMessage = function() {
        authReducer({
            type: AuthActionType.CLEAR_ERROR_MESSAGE,
            payload: null,
        });
    }

    auth.loginUser = async function(userData, store) {
        try {
            const response = await api.loginUser(userData)
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                });
                history.push("/");
                store.loadIdNamePairs();
            } 
        } catch(err) {
            authReducer({
                type: AuthActionType.DISPLAY_ERROR_MESSAGE,
                payload: { 
                    errorMessage: err.response.data.errorMessage,
                }
            });
        }
    }

    auth.logoutUser = async function() {
        const response = await api.logoutUser();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.LOGOUT_USER,
                payload: null
            });
        }
        history.push("/")
    }

    auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.SET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user
                }
            });
        }
    }

    auth.registerUser = async function(userData, store) {
        try {
            const response = await api.registerUser(userData);      
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
                store.loadIdNamePairs();
            }
        } catch (err) {
            authReducer({
                type: AuthActionType.DISPLAY_ERROR_MESSAGE,
                payload: { 
                    errorMessage: err.response.data.errorMessage,
                }
            });
        }
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };