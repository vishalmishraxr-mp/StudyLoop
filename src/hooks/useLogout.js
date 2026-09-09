import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { setToken } from "../slices/authSlice";
import { setUser } from "../slices/profileSlice";
import { resetCart } from "../slices/cartSlice";

export default function useLogout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("totalItems");

        dispatch(setToken(null));
        dispatch(setUser(null));
        dispatch(resetCart());

        toast.success("Logged out successfully");
        navigate("/login");
    };
}
