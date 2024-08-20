import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from "@services/api";

import { UserDTO } from "@dtos/userDTO";

import { saveUserStorage, getUserStorage } from "@storage/storageUser";

export type AuthContextDataProps = {
    user: UserDTO;
    signIn: (email: string, password: string) => Promise<void>;
    isLoadingUserStorageData: boolean;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export const AuthContextProvider = ({children}: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [ isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post('/sessions', {email, password} )

      if(data.user) {
        setUser(data.user)
        saveUserStorage(data.user)
      } 
    } catch (error) {
      throw error;
    }
    
  }

  const loadUserData = async () => {
    try {
    const userLogged = await getUserStorage();

    if(userLogged) {
      setUser(userLogged);
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
            isLoadingUserStorageData
          }} >
            {children}
        </AuthContext.Provider>
    )
} 