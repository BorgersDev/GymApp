import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from "@services/api";

import { UserDTO } from "@dtos/UserDTO";

import { saveUserStorage, getUserStorage, removeUserStorage } from "@storage/storageUser";

import { authTokenStorageSave, getAuthTokenStorage, removeAuthTokenStorage } from "@storage/authTokenStorage";


export type AuthContextDataProps = {
    user: UserDTO;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>
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

  const saveUserAndTokenStorage =  async (userData: UserDTO, token: string) => {
    try {
      setIsLoadingUserStorageData(false)

        await saveUserStorage(userData);
        await authTokenStorageSave(token)
    } catch(error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post('/sessions', {email, password} )

      if(data.user && data.token ) {

        await saveUserAndTokenStorage(data.user, data.token);
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

  const loadUserData = async () => {
    try {
    setIsLoadingUserStorageData(false)

    const userLogged = await getUserStorage();
    const token = await getAuthTokenStorage();

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

    return(
        <AuthContext.Provider value={{ 
            user,
            signIn,
            signOut,
            isLoadingUserStorageData
          }} >
            {children}
        </AuthContext.Provider>
    )
} 