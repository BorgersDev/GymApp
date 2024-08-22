import { useCallback, useEffect, useState } from "react"
import { FlatList } from "react-native"
import { useNavigation,useFocusEffect } from "@react-navigation/native"

import { api } from "@services/api"
import { AppNavigationRoutesProps } from "@routes/app.routes"
import { ExerciseDTO } from "@dtos/exerciseDTO"

import {  Heading, HStack, Text, useToast, VStack } from "@gluestack-ui/themed"

import { Group } from "@components/Group"
import { HomeHeader } from "@components/HomeHeader"
import { ExerciseCard } from "@components/ExerciseCard"

import { AppError } from "@utils/AppError"
import { ToastMessage } from "@components/ToastMessage"
import { Loading } from "@components/Loading"


export const Home = () => {
    const [ groups, setGroups ] = useState<string[]>([])
    const [ exercises, setExercises] = useState<ExerciseDTO[]>([])
    const [groupSelected, setGroupSelected] = useState("costas")
    const [isLoadingExercises, setIsLoadingExercises] = useState(true);

    const toast = useToast();

    const navigation = useNavigation<AppNavigationRoutesProps>()

    const handleOpenExerciseDetails = (exerciseId: string) => {
        navigation.navigate("exercise", {exerciseId})
    }

    const fetchGroups = async () => {
        try {

            const response = await api.get('/groups');
            setGroups(response.data)

        } catch(error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível carregar os grupos musculares'
            toast.show({
                placement: 'top',
                render : ({id}) => (
                    <ToastMessage 
                        id={id}
                        title={title}
                        action="error"
                        onClose={() => toast.close(id)}
                    />
                )
            })
        }
    }

    const fetchExercisesByGroup = async () => {
        try {
            setIsLoadingExercises(true)
            const response = await api.get(`/exercises/byGroup/${groupSelected}`);
            setExercises(response.data)

        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível carregar os exercícios'
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
            setIsLoadingExercises(false)
        }
    }

    useEffect(() => {
        fetchGroups();
    },[])

    useFocusEffect(useCallback(() => {
        fetchExercisesByGroup();
    },[groupSelected]))


    return (
        <VStack flex={1}>
            <HomeHeader />

            <FlatList data={groups} keyExtractor={(item)=> item } renderItem={({item}) => (
                <Group 
                    name={item} 
                    isActive={groupSelected.toLowerCase() === item.toLowerCase() } 
                    onPress={() => setGroupSelected(item)}
                />
             )} 
             horizontal
             showsHorizontalScrollIndicator={false}
             contentContainerStyle={{paddingHorizontal: 10}}
             style={{marginVertical: 25, maxHeight: 44, minHeight:44}}
            />

            <VStack px="$5" flex={1} >
                <HStack justifyContent="space-between" mb="$3" alignItems="center">
                    <Heading color="$gray200" fontSize="$md">
                        Exercícios
                    </Heading>

                    <Text color="$gray200" fontSize="$sm" fontFamily="$body" >
                        {exercises.length}
                    </Text>
                </HStack>

                {
                    isLoadingExercises ? <Loading /> :

                    <FlatList 

                    data={exercises} 
                    keyExtractor={(item) => item.id} 
                    renderItem={({item}) => (
                        <ExerciseCard 
                            onPress={() => handleOpenExerciseDetails(item.id)}
                            data={item} 
                        />
                    )} 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 20}}
                    
                />}
                
            </VStack>
        </VStack>
    )
}