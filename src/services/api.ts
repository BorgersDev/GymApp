import { AppError } from "@utils/AppError";
import axios, { AxiosInstance } from "axios";

type SignOut = () => void;

type ApiInstanceProps = AxiosInstance & {
    registerInterceptTokenManager: (SignOut: SignOut) => () => void;
}

const api = axios.create({
    baseURL: "http://10.0.0.113:3333"
}) as ApiInstanceProps

api.registerInterceptTokenManager = signOut =>  {
    const InterceptTokenManager = api.interceptors.response.use(response => response, requestError => {
        if(requestError?.response?.status === 401) {
            if(requestError.response.data?.message === 'token.expired' || requestError.response.data?.message === 'token.invalid') {

            }
            signOut();
        }




        if(requestError.response && requestError.response.data) {
            return Promise.reject(new AppError(requestError.response.data.message))
        } else {
            return Promise.reject(requestError)
        }
    });

    return () => {
        api.interceptors.response.eject(InterceptTokenManager)
    }
}

export {api}