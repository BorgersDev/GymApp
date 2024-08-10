import { ScrollView, TouchableOpacity } from "react-native"

import { Center, Heading, Text, VStack } from "@gluestack-ui/themed"

import { ScreenHeader } from "@components/ScreenHeader"
import { UserPic } from "@components/UserPic"
import { Input } from "@components/input"
import { Button } from "@components/Button"


export const Profile = () => {
    return (
        <VStack flex={1}>
            <ScreenHeader title="Perfil" />

            <ScrollView 
                contentContainerStyle={{flexGrow: 1 ,paddingBottom: 36}} 
                showsVerticalScrollIndicator={false} 
                automaticallyAdjustKeyboardInsets 
                bounces={false}
            >
                <Center mt="$4" px="$10" >
                    <UserPic 
                        source={{uri: "https://github.com/BorgersDev.png"}} 
                        alt="Foto do usuário" 
                        size="xl"
                    />
                    <TouchableOpacity>
                        <Text color="$green500" fontFamily="$heading" fontSize="$md" mt="$2" mb="$8" >
                            Alterar foto
                        </Text>
                    </TouchableOpacity>

                    <Center w="$full" gap="$3" >
                        <Input placeholder="Nome" bg="$gray600" />
                        <Input value="arthur@email.com" bg="$gray600" isReadOnly/>
                    </Center>
                    <Heading 
                        alignSelf="flex-start"
                        fontFamily="$heading"
                        color="$gray200"
                        fontSize="$md"
                        mt="$9"
                        mb="$2"
                    >
                            Alterar senha
                    </Heading>
                    <Center w="$full" gap="$3" >
                        <Input placeholder="Senha antiga" bg="$gray600" secureTextEntry />
                        <Input placeholder="Nova senha" bg="$gray600" secureTextEntry />
                        <Input placeholder="Confirmar nova senha" bg="$gray600" secureTextEntry />

                        <Button title="Atualizar senha" />
                    </Center>
                </Center>
            </ScrollView>
        </VStack>
    )
}