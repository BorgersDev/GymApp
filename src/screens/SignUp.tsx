import { useNavigation } from "@react-navigation/native"

import { Center, Heading, Image, Text, VStack, ScrollView } from "@gluestack-ui/themed"
import { useForm, Controller } from "react-hook-form"

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { AuthNavigationRoutesProps } from "@routes/auth.routes"

import { Input } from "@components/input"
import { Button } from "@components/Button"

import BackgroundImg from "@assets/background.png"
import Logo from "@assets/logo.svg"

type FormDataProps = {
    name: string;
    email: string;
    password: string;
    password_confirm: string;
}

const signUpSchema = yup.object({
    name: yup.string().required('informe o nome'),
    email: yup.string().required('Informe o e-mail').email('E-mail inválido')
})


export const SignUp = () => {
    const { control, handleSubmit, formState : {errors} } =useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema)
    });

    const navigation = useNavigation()

    const handleGoBack = () => {
        navigation.goBack()
    }

    const handleSignUp = (data: FormDataProps) => {
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
                            />
                        )}
                    />
                    
                    
                    
                    <Button 
                        title="Criar e Acessar" 
                        onPress={handleSubmit(handleSignUp)}
                    />
                 </Center>

                 <Button title="Voltar ao Login" variant="outline" mt="$5" onPress={handleGoBack} />
                   

            </VStack>
        </VStack>
        </ScrollView>
    )
}