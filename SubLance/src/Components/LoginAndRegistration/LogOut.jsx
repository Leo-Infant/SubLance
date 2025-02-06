import { useEffect } from "react";
import useHandleLogOut from "./useHandleLogOut";

const LogOut = () => {
    const logOut = useHandleLogOut();

    useEffect(() => {
        logOut();
    }, []);

    return null;
};

export default LogOut;
