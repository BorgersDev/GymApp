import { createContext, ReactNode, useState } from "react";

import { api } from "@services/api";

import { UserDTO } from "@dtos/userDTO";

export type AuthContextDataProps = {
    user: UserDTO;
    signIn: (email: string, password: string) => Promise<void>;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export const AuthContextProvider = ({children}: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post('/sessions', {email, password} )

      if(data.user) {
      setUser(data.user)
    } 
    } catch (error) {
      console.log(error)
      throw error;
    }
    
  }

    return(
        <AuthContext.Provider value={{ user, signIn }} >
            
            {children}
      
          </AuthContext.Provider>
    )
} 