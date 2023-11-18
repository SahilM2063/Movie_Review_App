// useNotification.js (or another appropriate name)
import { useContext } from "react";
import { NotificationContext } from "../context/NotificationProvider";
import { AuthContext } from "../context/AuthProvider";

export const useNotification = () => {
    const updateNotification = useContext(NotificationContext);
    return updateNotification;
};

export const useAuth = () => {
    const { handleLogin, authInfo, handleLogout, isAuth } = useContext(AuthContext);


    return {
        authInfo, handleLogin, handleLogout, isAuth
    }
};



