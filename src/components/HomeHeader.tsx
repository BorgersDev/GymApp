import { Heading, HStack, Icon, Text, VStack } from "@gluestack-ui/themed"
import { LogOut } from "lucide-react-native"

import { UserPic } from "./UserPic"

import  defaultUserPhotoImg from '@assets/userPhotoDefault.png'

import { useAuth } from "@hooks/useAuth"
import { TouchableOpacity } from "react-native"
import { api } from "@services/api"


export const HomeHeader = () => {
     
    const { user, signOut } = useAuth();

    return (
        <HStack bg="$gray600" pt="$14" pb="$5" px="$8" alignItems="center" gap="$4" >
            <UserPic 
                source={ user.avatar ? {uri: `${api.defaults.baseURL}/avatar/${user.avatar}` } : defaultUserPhotoImg } 
                w="$16"
                h="$16"
                alt="Imagem do Usuário" 
            />
            <VStack flex={1}>
                <Text color="$gray100" fontSize="$sm" >Olá,</Text>
                <Heading color="$gray100" fontSize="$md" >{user.name}</Heading>
            </VStack>
            <TouchableOpacity onPress={signOut}>
                <Icon as={LogOut} color="$gray200" size="xl" />
            </TouchableOpacity>
        </HStack>
    )
}