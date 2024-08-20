import { useContext } from "react";

import { NavigationContainer, DefaultTheme} from "@react-navigation/native";
import { Box } from "@gluestack-ui/themed";

import { useAuth } from "@hooks/useAuth";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { Loading } from "@components/Loading";

export const Routes = () => {
    const theme = DefaultTheme
    theme.colors.background = gluestackUIConfig.tokens.colors.gray700

    const { user, isLoadingUserStorageData } = useAuth();

    if(isLoadingUserStorageData) {
        return <Loading />
    }

    return (
        <Box flex={1} bg="$gray700">
            <NavigationContainer theme={theme} >
                {user.id ? <AppRoutes /> : <AuthRoutes />}
            </NavigationContainer>
        </Box>
    )
}