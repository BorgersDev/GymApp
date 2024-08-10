import { useNavigation } from "@react-navigation/native"

import { Center, Heading, Image, Text, VStack, ScrollView } from "@gluestack-ui/themed"
import { useForm, Controller } from "react-hook-form"

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


export const SignUp = () => {
    const { control, handleSubmit, formState : {errors} } =useForm<FormDataProps>();

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
                        rules={{
                            required: 'Informe o nome'
                        }}
                        render={({field: {onChange, value}}) => (
                            <Input 
                                placeholder="Nome"  
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />

                    { errors.name?.message && (<Text color="$white" >
                        {errors.name.message}
                    </Text>)}
                    

                    <Controller 
                        control={control} 
                        name="email"
                        rules={{
                            required: "Informe o email",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "E-mail inválido"
                            }
                        }}
                        render={({field: {onChange, value}}) => (
                            <Input 
                                placeholder="E-mail" 
                                keyboardType="email-address" 
                                autoCapitalize="none" 
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    { errors.email?.message && (<Text color="$white" >
                        {errors.email.message}
                    </Text>)}

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