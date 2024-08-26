import AsyncStorage from "@react-native-async-storage/async-storage";

import { AUTH_TOKEN_STORAGE } from "@storage/storageConfig";

type AuthTokenStorageProps = {
    token: string;
    refresh_token: string;
}

export const authTokenStorageSave = async ({token, refresh_token}: AuthTokenStorageProps ) => {
    await AsyncStorage.setItem(AUTH_TOKEN_STORAGE,JSON.stringify({token, refresh_token}) );

}

export const getAuthTokenStorage = async () => {
    const response = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);

    const {token, refresh_token}: AuthTokenStorageProps = response ? JSON.parse(response) : {};
    
    return {token, refresh_token};
}

export const removeAuthTokenStorage = async () => {
    await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE)
}