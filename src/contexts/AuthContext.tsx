import { createContext } from "react";

import { UserDTO } from "@dtos/userDTO";

export type AuthContextDataProps = {
    user: UserDTO
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);