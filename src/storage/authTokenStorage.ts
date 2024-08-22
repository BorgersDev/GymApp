import AsyncStorage from "@react-native-async-storage/async-storage";

import { AUTH_TOKEN_STORAGE } from "@storage/storageConfig";

export const authTokenStorageSave = async (token: string) => {
    await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token);

}

export const getAuthTokenStorage = async () => {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);
    
    return token;
}

export const removeAuthTokenStorage = async () => {
    await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE)
}