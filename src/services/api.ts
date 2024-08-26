import { getAuthTokenStorage } from "@storage/authTokenStorage";
import { AppError } from "@utils/AppError";
import axios, { AxiosError, AxiosInstance } from "axios";

type SignOut = () => void;

type PromiseType = {
    onSuccess: (token: string) => void;
    onFailure: (error: AxiosError) => void;
}

type ApiInstanceProps = AxiosInstance & {
    registerInterceptTokenManager: (signOut: SignOut) => () => void;
}

const api = axios.create({
    baseURL: "http://10.0.0.113:3333"
}) as ApiInstanceProps

let failedQueue: Array<PromiseType> = [];
let isRefreshing = false;

api.registerInterceptTokenManager = signOut =>  {
    const interceptTokenManager = api.interceptors.response.use(response => response, async (requestError) => {
        if(requestError?.response?.status === 401) {
            if(requestError.response.data?.message === 'token.expired' || requestError.response.data?.message === 'token.invalid') {
                const { refresh_token } = await getAuthTokenStorage();

                if(!refresh_token) {
                    signOut();

                    return Promise.reject(requestError);
                }

                const originalRequestConfig = requestError.config;

                if(isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({
                            onSuccess: (token: string) => {
                                originalRequestConfig.headers = { 'Authorization': `Bearer ${token}` }
                                resolve(api(originalRequestConfig));
                            },
                            onFailure: (error: AxiosError) => {
                                reject(error);
                            },
                        })
                    });
                }

                isRefreshing = true;
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
        api.interceptors.response.eject(interceptTokenManager)
    }

}

export {api}