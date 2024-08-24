import { AppError } from "@utils/AppError";
import axios, { AxiosInstance } from "axios";

type SignOut = () => void;

type ApiInstanceProps = AxiosInstance & {
    registerInterceptTokenManager: (SignOut: SignOut) => () => void;
}

const api = axios.create({
    baseURL: "http://192.168.1.47:3333"
}) as ApiInstanceProps

api.registerInterceptTokenManager = SignOut =>  {
    const InterceptTokenManager = api.interceptors.response.use(response => response, error => {
        if(error.response && error.response.data) {
            return Promise.reject(new AppError(error.response.data.message))
        } else {
            return Promise.reject(error)
        }
    });

    return () => {
        api.interceptors.response.eject(InterceptTokenManager)
    }
}

export {api}