import { useEffect, useState } from "react"
import { FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { api } from "@services/api"
import { AppNavigationRoutesProps } from "@routes/app.routes"

import {  Heading, HStack, Text, useToast, VStack } from "@gluestack-ui/themed"

import { Group } from "@components/Group"
import { HomeHeader } from "@components/HomeHeader"
import { ExerciseCard } from "@components/ExerciseCard"

import { AppError } from "@utils/AppError"
import { ToastMessage } from "@components/ToastMessage"


export const Home = () => {
    const [ groups, setGroups ] = useState<string[]>([])
    const [ exercises, setExercises] = useState(["Puxada frontal", "Remada curvada", "Remada unilateral", "Levantamento terra"])
    const [groupSelected, setGroupSelected] = useState("Costas")

    const toast = useToast();

    const navigation = useNavigation<AppNavigationRoutesProps>()

    const handleOpenExerciseDetails = () => {
        navigation.navigate("exercise")
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
    useEffect(() => {
        fetchGroups();
    },[])
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

                <FlatList 

                    data={exercises} 
                    keyExtractor={(item) => item} 
                    renderItem={() => (<ExerciseCard onPress={handleOpenExerciseDetails} />)} 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 20}}
                    
                />
                
            </VStack>
        </VStack>
    )
}