import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from "@services/api";

import { UserDTO } from "@dtos/UserDTO";

import { saveUserStorage, getUserStorage, removeUserStorage } from "@storage/storageUser";

import { authTokenStorageSave, getAuthTokenStorage, removeAuthTokenStorage } from "@storage/authTokenStorage";


export type AuthContextDataProps = {
    user: UserDTO;
    signIn: (email: string, password: string) => Promise<void>;
    updateUserProfile: (userUpdated: UserDTO) => Promise<void>;
    signOut: () => Promise<void>;
    isLoadingUserStorageData: boolean;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export const AuthContextProvider = ({children}: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [ isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

  const userAndTokenUpdate = async (userData: UserDTO, token: string ) => {
     
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      setUser(userData)
  }

  const saveUserAndTokenStorage =  async (userData: UserDTO, token: string, refresh_token: string) => {
    try {
      setIsLoadingUserStorageData(false)

        await saveUserStorage(userData);
        await authTokenStorageSave({token, refresh_token})
    } catch(error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post('/sessions', {email, password} )

      if(data.user && data.token && data.refresh_token) {

        await saveUserAndTokenStorage(data.user, data.token, data.refresh_token);
        userAndTokenUpdate(data.user,data.token)
      } 
    } catch (error) {
      throw error;
    }
    
  }

  const signOut =  async () =>{
    try {
      setIsLoadingUserStorageData(true)

      setUser({} as UserDTO)
      await removeUserStorage();
      await removeAuthTokenStorage();

    } catch (error) {
      throw error;
    } finally{
      setIsLoadingUserStorageData(false)
    }
  }

  const updateUserProfile = async (userUpdated: UserDTO) => {
      try {
        setUser(userUpdated)
        await saveUserStorage(userUpdated)

      } catch (error) {
        throw error;
      }
  }

  const loadUserData = async () => {
    try {
    setIsLoadingUserStorageData(false)

    const userLogged = await getUserStorage();
    const { token } = await getAuthTokenStorage();

    if(token && userLogged) {
      userAndTokenUpdate(userLogged, token);
    }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  useEffect(() => {
    loadUserData();
  }, [])

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut);

    return () => {
      subscribe();
    }
  },[signOut])

    return(
        <AuthContext.Provider value={{ 
            user,
            signIn,
            signOut,
            updateUserProfile,
            isLoadingUserStorageData
          }} >
            {children}
        </AuthContext.Provider>
    )
} 