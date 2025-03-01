import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const useHandleLogOut = () => {
    const navigate = useNavigate();
    const { setToken } = useContext(AuthContext);

    const logOut = () => {
        localStorage.removeItem("authToken");
        setToken(null); 
        navigate("/login");
    };

    return logOut;
};

export default useHandleLogOut;
