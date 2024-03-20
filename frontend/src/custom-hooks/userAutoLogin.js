import { useState, useEffect } from "react";
import { setUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

function useAutoLogin() {
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        // IIFE
        (async function autoLoginApiCall() {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_API}/refresh`,
                    {
                        withCredentials: true,
                    }
                );

                if (response.status === 200) {
                    // 1. setUser
                    const user = {
                        _id: response.data.user._id,
                        email: response.data.user.email,
                        username: response.data.user.username,
                        auth: response.data.auth,
                    };

                    dispatch(setUser(user));
                }
            } catch (error) {
                // Handle errors
                if (error.response && error.response.status === 401) {
                    // Unauthorized, user needs to log in again
                    console.log("User not authenticated or token expired.");
                } else {
                    console.log("An error occurred while auto-login:", error.message);
                }
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return loading;
}

export default useAutoLogin;
