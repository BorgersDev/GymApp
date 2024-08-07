import { Center, Heading, Image, Text, VStack, ScrollView } from "@gluestack-ui/themed"

import BackgroundImg from "@assets/background.png"
import Logo from "@assets/logo.svg"

import { Input } from "@components/input"
import { Button } from "@components/Button"

export const SignUp = () => {
    return (
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1}} 
            showsVerticalScrollIndicator={false} 
            automaticallyAdjustKeyboardInsets 
            keyboardDismissMode="on-drag"
            bounces={false}
            bg="$green700"
            >
        <VStack flex={1} bg="$gray700" >
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

                <Center gap="$2" flex={1} justifyContent="flex-start">
                    <Heading color="$gray100" > Crie sua conta </Heading>

                    <Input placeholder="Nome"  />
                    <Input placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" />
                    <Input placeholder="Senha" secureTextEntry autoCapitalize="none"/>
                    
                    <Button title="Criar e Acessar" />
                 </Center>

                 <Button title="Voltar ao Login" variant="outline" mt="$5" />
                   

            </VStack>
        </VStack>
        </ScrollView>
    )
}