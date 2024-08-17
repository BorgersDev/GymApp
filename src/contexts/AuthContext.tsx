import { createContext, ReactNode } from "react";

import { UserDTO } from "@dtos/userDTO";

export type AuthContextDataProps = {
    user: UserDTO
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export const AuthContextProvider = ({children}: AuthContextProviderProps) => {
    return(
        <AuthContext.Provider value={{
            user: {
              id: '1',
              name: 'Arthur',
              email: 'arthur@email.com',
              avatar: 'arthur.png',
            }
          }} >
            
            {children}
      
          </AuthContext.Provider>
    )
} 