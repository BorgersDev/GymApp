import { useEffect, useState } from "react"
import { ScrollView, TouchableOpacity } from "react-native"

import { Box, Heading, HStack, Icon, Image, Text, useToast, VStack } from "@gluestack-ui/themed"

import { useNavigation, useRoute } from "@react-navigation/native"
import { AppNavigationRoutesProps } from "@routes/app.routes"

import { api } from "@services/api"
import { AppError } from "@utils/AppError"

import { ExerciseDTO } from "@dtos/exerciseDTO"

import { ArrowLeft } from "lucide-react-native"

import { Button } from "@components/Button"
import { ToastMessage } from "@components/ToastMessage"
import { Loading } from "@components/Loading"

import BodySvg from "@assets/body.svg"
import SeriesSvg from "@assets/series.svg"
import RepetitionsSvg from "@assets/repetitions.svg"

type RoutesParams = {
    exerciseId: string;
}


export const Exercise = () => {
    const [sendingRegister, setSendingRegister] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const [exerciseDetails, setExerciseDetails] = useState({} as ExerciseDTO)
    
    const navigation = useNavigation<AppNavigationRoutesProps>()
    
    const route = useRoute();

    const toast = useToast();

    const {exerciseId} = route.params as RoutesParams
    
    const handleGoBack = () => {
        navigation.goBack()
    }

    const fetchExerciseDetails = async () => {
        try {
            setIsLoading(true)
            const response = await api.get(`/exercises/${exerciseId}`)
            setExerciseDetails(response.data)
        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível carregar os detalhes do exercício'
            toast.show({
                placement: 'top',
                render: ({id}) => (
                    <ToastMessage 
                        id={id}
                        title={title}
                        action="error"
                        onClose={() => toast.close(id)}
                    />
                )
            })

        } finally {
            setIsLoading(false)
        }
    }

    const handleRegisterExerciseHistory = async () => {
        try {
            setSendingRegister(true)

            await api.post('/history', {exercise_id: exerciseId})

            toast.show({
                placement: 'top',
                render: ({id}) => (
                    <ToastMessage 
                        id={id}
                        title="Parabéns, exercício registrado no seu histórico."
                        action="success"
                        onClose={() => toast.close(id)}
                    />
                )
            })

            navigation.navigate('history')
            
        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível carregar os detalhes do exercício'
            toast.show({
                placement: 'top',
                render: ({id}) => (
                    <ToastMessage 
                        id={id}
                        title={title}
                        action="error"
                        onClose={() => toast.close(id)}
                    />
                )
            })

        } finally {
            setSendingRegister(false)
        }
    }

    useEffect(() => {
        fetchExerciseDetails();
    }, [exerciseId])

    return (
        <VStack flex={1} >
            <VStack px="$8" bg="$gray600" pt="$14" >
              <TouchableOpacity onPress={handleGoBack}  >
                   <Icon as={ArrowLeft} color="$green500" size="xl" />
              </TouchableOpacity>

              <HStack 
                justifyContent="space-between" 
                alignItems="center" 
                mt="$4"
                mb="$8"
                >
                <Heading 
                    color="$gray100" 
                    fontFamily="$heading" 
                    fontSize="$lg" 
                    flexShrink={1} 
                >
                    {exerciseDetails.name}
                </Heading>
                <HStack alignItems="center" >
                    <BodySvg />
                    
                    <Text color="$gray200" ml="$1" textTransform="capitalize" >
                    {exerciseDetails.group}
                    </Text>
                </HStack>
              </HStack>
             </VStack>

             <ScrollView
                contentContainerStyle={{flexGrow: 1, paddingBottom: 32}}
                showsVerticalScrollIndicator={false}
             >
                {
                    isLoading ? <Loading /> : 
            
                    <VStack p="$8" >
                        <Box rounded="$3xl" mb={15} overflow="hidden">

                            <Image 
                                source={{uri: `${api.defaults.baseURL}/exercise/demo/${exerciseDetails.demo}`}} 
                                alt="imagem do exercício" 
                                resizeMode="cover"
                                rounded="$lg"
                                w="$full"
                                h="$96"
                            />
                        </Box>
                        <Box bg="$gray600" rounded="$md" pb="$4" px="$4">
                            <HStack alignItems="center" justifyContent="space-around" mb="$6" mt="$5">
                                <HStack>
                                    <SeriesSvg />
                                    <Text color="$gray200" ml="$2" >
                                        {exerciseDetails.series} séries
                                    </Text>
                                </HStack>
                                <HStack>
                                    <RepetitionsSvg />
                                    <Text color="$gray200" ml="$2" >
                                        {exerciseDetails.repetitions} Repetições
                                    </Text>
                                </HStack>
                            </HStack>
                            <Button 
                                title="Marcar como concluído" 
                                isLoading={sendingRegister} 
                                onPress={handleRegisterExerciseHistory}
                            />
                        </Box>
                        
                    </VStack>
                }
           </ScrollView>

        </VStack>
    )
}