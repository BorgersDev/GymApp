import { Center, Heading, Image, Text, VStack, ScrollView } from "@gluestack-ui/themed"

import { useNavigation } from "@react-navigation/native"

import { AuthNavigationRoutesProps } from "@routes/auth.routes"

import BackgroundImg from "@assets/background.png"
import Logo from "@assets/logo.svg"

import { Input } from "@components/input"
import { Button } from "@components/Button"

export const SignIn = () => {
    const navigation = useNavigation<AuthNavigatorRoutesProps>()

    const handleNewAccount = () => {
        navigation.navigate("signUp")
    }
    return (
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1}} 
            showsVerticalScrollIndicator={false} 
            automaticallyAdjustKeyboardInsets 
            keyboardDismissMode="on-drag"
            bounces={false}
        >
        <VStack flex={1}>
            <Image 
            w={"$full"}
            h={700} 
            source={BackgroundImg} 
            defaultSource={BackgroundImg}
            alt="Pessoas treinando"
            position="absolute"
            />
            <VStack flex={1} px="$10" pb="$16">
                <Center my="$24">
                   <Logo />
                   <Text color="$gray100" fontSize="$sm"> Treine sua mente e o seu corpo</Text>
                </Center>

                <Center gap="$2">
                    <Heading color="$gray100" > Acesse sua conta </Heading>
                    
                    <Input placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" />
                    <Input placeholder="Senha" secureTextEntry autoCapitalize="none"/>
                    <Button title="Acessar" />
                 </Center>

                 <Center flex={1} justifyContent="flex-end" mt="$4">
                    <Text color="$gray100" fontSize="$sm" mb="$3" fontFamily="$body">
                        Ainda não tem acesso?
                    </Text>

                    <Button title="Criar conta" variant="outline" onPress={handleNewAccount} />
                 </Center>

            </VStack>
        </VStack>
        </ScrollView>
    )
}