import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserDTO } from "@dtos/userDTO";

import { USER_STORAGE } from "./storageConfig";

export const saveUserStorage = async ( user: UserDTO) => {
    await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
}

export const getUserStorage = async () => {
    const storage = await AsyncStorage.getItem(USER_STORAGE);

    const user: UserDTO = storage  ? JSON.parse(storage) : {};

    return user;
}

export const removeUserStorage = async () => {
    await AsyncStorage.removeItem(USER_STORAGE)
}