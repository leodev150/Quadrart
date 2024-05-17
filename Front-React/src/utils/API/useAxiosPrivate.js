import { axiosPrivate } from "./axios";
import { useEffect } from "react";
import { logout } from "../../state/UserState";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";


const useAxiosPrivate = () => {
    const dispatch = useDispatch();

    useEffect(() => {

        const responseIntercept = axiosPrivate.interceptors.response.use(
            async(response) => {
                return response;
            },
            async (error) => {
                const prevRequest = error?.config;
                if (!prevRequest?.sent) {

                    try{
                        await axios.get(`${process.env.REACT_APP_API_URL}/auth/checkTokenExp`, {
                            withCredentials: "true"
                        });
                        prevRequest.sent = true;

                    } catch(e){
                        dispatch(logout());
                        toast.error("Sua sessão expirou");
                    }

                }
            }
        )

    }, [])

    return axiosPrivate;
}


export default useAxiosPrivate;