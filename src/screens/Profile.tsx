import { useState } from "react"

import { ScrollView, TouchableOpacity } from "react-native"

import { Center, Heading, Text, VStack, useToast } from "@gluestack-ui/themed"

import {Controller, useForm} from 'react-hook-form'
import * as yup from 'yup'

import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"

import { ScreenHeader } from "@components/ScreenHeader"
import { UserPic } from "@components/UserPic"
import { Input } from "@components/input"
import { Button } from "@components/Button"
import { ToastMessage } from "@components/ToastMessage"
import { useAuth } from "@hooks/useAuth"
import { yupResolver } from "@hookform/resolvers/yup"
import { api } from "@services/api"
import { AppError } from "@utils/AppError"

type formDataProps = {
    name: string;
    email: string;
    password: string;
    old_password: string;
    confirm_password: string;
}

const profileSchema = yup.object({
    name: yup.string().required("Informe o nome."),
    password: yup.string().min(6, 'A senha deve ter pelo menos 6 dígitos.').nullable().transform((value) => !!value ? value : null),
    confirm_password: yup
        .string()
        .nullable()
        .transform((value) => !!value ? value : null)
        .oneOf([yup.ref('password'), null], 'Está diferente da senha.')
        .when('password', {
            is: (field: any) => field,
            then: (schema) => schema.nullable().required('Confirme a senha').transform((value) => !!value ? value : null)
            
        })
})

export const Profile = () => {
    const [ isUpdating, setIsUpdating] = useState(false);
    const [userPicture, setUserPicture] = useState("https://github.com/BorgersDev.png")

    const toast = useToast()

    const { user, updateUserProfile } = useAuth();

    const { control, handleSubmit, formState: {errors} } = useForm<formDataProps>({
        defaultValues: {
            name: user.name,
            email: user.email

        },
        resolver: yupResolver(profileSchema),
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

    const handleUpdateProfile = async (data: formDataProps) => {
        try {
            setIsUpdating(true)

            const userUpdated = user;
            userUpdated.name = data.name;

            await api.put('/users', data)

            await updateUserProfile(userUpdated)

            toast.show({
                placement: 'top',
                render: (({id}) => (
                    <ToastMessage 
                        id={id}
                        title='Perfil atualizado com sucesso!'
                        action="success"
                        onClose={() => toast.close(id)}
                    />
                ))
            })
            
        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível atualizar os dados do perfil'
            toast.show({
                placement: 'top',
                render: (({id}) => (
                    <ToastMessage 
                        id={id}
                        title={title}
                        action="error"
                        onClose={() => toast.close(id)}
                    />
                ))
            })
        } finally {
            setIsUpdating(false)
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
                                    errorMessage={errors.name?.message}
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

                        <Controller     
                            control={control}
                            name="old_password"
                            render={({field: {onChange}}) => (
                                <Input 
                                    placeholder="Senha antiga" 
                                    onChangeText={onChange}
                                    secureTextEntry 
                                    bg="$gray600" 
                                />
                            )}
                        />
                        <Controller     
                            control={control}
                            name="password"
                            render={({field: {onChange}}) => (
                                <Input 
                                    placeholder="Nova senha" 
                                    onChangeText={onChange}
                                    secureTextEntry 
                                    bg="$gray600" 
                                    errorMessage={errors.password?.message}
                                />
                            )}
                        />
                        <Controller     
                            control={control}
                            name="confirm_password"
                            render={({field: {onChange}}) => (
                                <Input 
                                    placeholder="Confirmar nova senha" 
                                    onChangeText={onChange}
                                    secureTextEntry 
                                    bg="$gray600" 
                                    errorMessage={errors.confirm_password?.message}
                                />
                            )}
                        />

                        <Button 
                            title="Atualizar" 
                            onPress={handleSubmit(handleUpdateProfile)}
                            isLoading={isUpdating}
                        />
                    </Center>
                </Center>
            </ScrollView>
        </VStack>
    )
}