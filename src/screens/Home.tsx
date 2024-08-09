import { useState } from "react"
import { FlatList } from "react-native"

import {  Heading, HStack, Text, VStack } from "@gluestack-ui/themed"

import { Group } from "@components/Group"
import { HomeHeader } from "@components/HomeHeader"
import { ExerciseCard } from "@components/ExerciseCard"


export const Home = () => {
    const [ exercises, setExercises] = useState(["Puxada frontal", "Remada curvada", "Remada unilateral", "Levantamento terra"])
    const [ groups, setGroups ] = useState(["Costas", "Bíceps", "Tríceps", "Ombro", "Pernas"])
    const [groupSelected, setGroupSelected] = useState("Costas")
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
                    renderItem={() => (<ExerciseCard />)} 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 20}}
                    
                />
                
            </VStack>
        </VStack>
    )
}