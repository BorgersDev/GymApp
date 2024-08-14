import { Center, Heading, Image, Text, VStack, ScrollView, onChange } from "@gluestack-ui/themed"

import { useNavigation } from "@react-navigation/native"

import { Controller, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { AuthNavigationRoutesProps } from "@routes/auth.routes"

import BackgroundImg from "@assets/background.png"
import Logo from "@assets/logo.svg"

import { Input } from "@components/input"
import { Button } from "@components/Button"

type FormDataProps = {
    email: string;
    password: string;
}

const signInSchema = yup.object({
    email: yup.string().required("Informe o E-mail.").email("E-mail inválido"),
    password: yup.string().required("Informe a senha").min(6,"Informe uma senha válida")
})

export const SignIn = () => {

    const { control, handleSubmit, formState : {errors} } = useForm<FormDataProps>({
        resolver: yupResolver(signInSchema)
    });

    const navigation = useNavigation<AuthNavigationRoutesProps>()

    const handleNewAccount = () => {
        navigation.navigate("signUp")
    }
    const handleSignIn = (data: FormDataProps) => {
        console.log(data)
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

                    <Controller 
                        control={control}
                        name="email"
                        render={({field: {onChange, value}}) => (
                            <Input 
                                placeholder="E-mail" 
                                keyboardType="email-address" 
                                autoCapitalize="none" 
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.email?.message}
                            />
                        )}
                    />

                    <Controller 
                        control={control}
                        name="password"
                        render={({field: {onChange, value}}) => (
                            <Input 
                                placeholder="Senha" 
                                secureTextEntry 
                                autoCapitalize="none"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />
                    
                    
                    <Button title="Acessar" onPress={handleSubmit(handleSignIn)} />
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