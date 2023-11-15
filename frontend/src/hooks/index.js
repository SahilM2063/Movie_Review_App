// useNotification.js (or another appropriate name)
import { useContext } from "react";
import { NotificationContext } from "../context/NotificationProvider";

export const useNotification = () => {
    const updateNotification = useContext(NotificationContext);
    return updateNotification;
};

