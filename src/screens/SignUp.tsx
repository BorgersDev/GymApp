import { useState } from "react"
import { useNavigation } from "@react-navigation/native"

import { Center, Heading, Image, Text, VStack, ScrollView, useToast } from "@gluestack-ui/themed"
import { useForm, Controller } from "react-hook-form"

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { api } from "@services/api"

import { useAuth } from "@hooks/useAuth"

import { Input } from "@components/input"
import { Button } from "@components/Button"

import { AppError } from "@utils/AppError"

import BackgroundImg from "@assets/background.png"
import Logo from "@assets/logo.svg"
import { ToastMessage } from "@components/ToastMessage"

type FormDataProps = {
    name: string;
    email: string;
    password: string;
    password_confirm: string;
}

const signUpSchema = yup.object({
    name: yup.string().required('informe o nome.'),
    email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
    password: yup.string().required('Informe o senha.').min(6, "A senha deve ter pelo menos 6 dígitos."),
    password_confirm: yup.string().required('Confirme a senha.').oneOf([yup.ref("password"), ""], "Está diferente da senha." )
})


export const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false);

    const toast = useToast();

    const {signIn} = useAuth();

    const { control, handleSubmit, formState : {errors} } =useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema)
    });

    const navigation = useNavigation()

    const handleGoBack = () => {
        navigation.goBack()
    }

    const handleSignUp = async ({name, email, password}: FormDataProps) => {

        try{
            setIsLoading(true)
            await api.post('/users',{name, email, password});
            await signIn(email,password)
            
        } catch(error) {
            setIsLoading(false)
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível criar a conta. Tente novamente mais tarde";

            toast.show({
                placement: 'top',
                render: ({id}) => (
                    <ToastMessage 
                        id={id} 
                        title={title} 
                        action="error" 
                        description="" 
                        onClose={() => toast.close(id)} 
                    />
                )
            })
        }


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

                <Center gap="$2" flex={1} justifyContent="flex-start">
                    <Heading color="$gray100" > Crie sua conta </Heading>

                    <Controller 
                        control={control} 
                        name="name"
                        render={({field: {onChange, value}}) => (
                            <Input 
                                placeholder="Nome"  
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.name?.message}
                            />
                        )}
                    />
                    

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
                                autoCapitalize="none"
                                secureTextEntry 
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />                    
                    
                    <Controller 
                        control={control} 
                        name="password_confirm"
                        render={({field: {onChange, value}}) => (
                            <Input 
                                placeholder="Confirmar senha" 
                                autoCapitalize="none"
                                secureTextEntry 
                                onSubmitEditing={handleSubmit(handleSignUp)}
                                returnKeyType="send"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.password_confirm?.message}
                            />
                        )}
                    />
                    
                    
                    
                    <Button 
                        title="Criar e Acessar" 
                        onPress={handleSubmit(handleSignUp)}
                        isLoading={isLoading}
                    />
                 </Center>

                 <Button title="Voltar ao Login" variant="outline" mt="$5" onPress={handleGoBack} />
                   

            </VStack>
        </VStack>
        </ScrollView>
    )
}