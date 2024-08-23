import { useState } from "react"

import { ScrollView, TouchableOpacity } from "react-native"

import { Center, Heading, Text, VStack, useToast } from "@gluestack-ui/themed"

import {Controller, useForm} from 'react-hook-form'

import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"

import { ScreenHeader } from "@components/ScreenHeader"
import { UserPic } from "@components/UserPic"
import { Input } from "@components/input"
import { Button } from "@components/Button"
import { ToastMessage } from "@components/ToastMessage"
import { useAuth } from "@hooks/useAuth"

type formDataProps = {
    name: string;
    email: string;
    password: string;
    old_password: string;
    confirm_password: string;
}

export const Profile = () => {
    const [userPicture, setUserPicture] = useState("https://github.com/BorgersDev.png")

    const toast = useToast()

    const { user } = useAuth();

    const { control } = useForm<formDataProps>({
        defaultValues: {
            name: user.name,
            email: user.email

        }
    })

    const handleUserSelectPic = async () => {
        try {
        const selectedPicture = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            aspect: [4,4],
            allowsEditing: true
        })

        
        if(selectedPicture.canceled) {
            return
        }

        const pictureURI = selectedPicture.assets[0].uri

        if(pictureURI) {
            const pictureInfo = await FileSystem.getInfoAsync(pictureURI) as {
                size: number
            }
            if(pictureInfo.size && (pictureInfo.size /1024 /1024) > 5) {
                return toast.show({
                    placement:"top",
                    render: ({id}) => (
                        <ToastMessage 
                            id={id} 
                            action="error" 
                            title="Imagem muito grande!" 
                            description="Escolha uma imagem com o tamanho menor que 5MB" 
                            onClose={() => toast.close(id)}
                        />
                    )
                })
            }
            setUserPicture(pictureURI)
        }
      } catch (error) {
        console.log(error)
      }
    }

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
                        source={{uri: userPicture}} 
                        alt="Foto do usuário" 
                        size="xl"
                    />
                    <TouchableOpacity onPress={handleUserSelectPic} >
                        <Text color="$green500" fontFamily="$heading" fontSize="$md" mt="$2" mb="$8" >
                            Alterar foto
                        </Text>
                    </TouchableOpacity>

                    <Center w="$full" gap="$3" >

                        <Controller     
                            control={control}
                            name="name"
                            render={({field: {value, onChange}}) => (
                                <Input 
                                    placeholder="Nome" 
                                    onChangeText={onChange}
                                    value={value}
                                    bg="$gray600" 
                                />
                            )}
                        />
                        <Controller     
                            control={control}
                            name="email"
                            render={({field: {value, onChange}}) => (
                                <Input 
                                    placeholder="E-mail"
                                    onChangeText={onChange}
                                    value={value}
                                    isReadOnly
                                    bg="$gray600" 
                                />
                            )}
                        />

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