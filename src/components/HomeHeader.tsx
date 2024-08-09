import { Heading, HStack, Icon, Text, VStack } from "@gluestack-ui/themed"
import { LogOut } from "lucide-react-native"

import { UserPic } from "./UserPic"

export const HomeHeader = () => {
    return (
        <HStack bg="$gray600" pt="$14" pb="$5" px="$8" alignItems="center" gap="$4" >
            <UserPic 
                source={{uri: "https://github.com/BorgersDev.png"}} 
                w="$16"
                h="$16"
                alt="Imagem do Usuário" 
            />
            <VStack flex={1}>
                <Text color="$gray100" fontSize="$sm" >Olá,</Text>
                <Heading color="$gray100" fontSize="$md" >Arthur Borges</Heading>
            </VStack>
            
            <Icon as={LogOut} color="$gray200" size="xl" />
        </HStack>
    )
}