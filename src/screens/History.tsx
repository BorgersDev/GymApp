import { useState } from "react"
import { SectionList } from "react-native"

import { Heading, Text, VStack } from "@gluestack-ui/themed"

import { HistoryCard } from "@components/HistoryCard"
import { ScreenHeader } from "@components/ScreenHeader"


export const History = () => {
    const [exercises, setExercises] = useState([
        {
            title: "08.08.24",
            data: ["Puxada Frontal","Remada unilateral"]
        },
        {
            title: "09.08.24",
            data: ["Supino Inclinado", "Desenvolvimento", "Fly"],
        }
    ])
    return (
        <VStack flex={1}>
            <ScreenHeader title="Histórico de Exercícios" />
            <SectionList 
            sections={exercises} 
            keyExtractor={item => item} 
            renderItem={() => (<HistoryCard />)}
            renderSectionHeader={({section}) => (
                <Heading 
                    color="$gray200" 
                    fontSize="$md" 
                    mt="$2" 
                    mb="$2" 
                >
                    {section.title}
                </Heading>
            )}
            style={{paddingHorizontal: 22}}
            contentContainerStyle={exercises.length === 0 && {flex: 1, justifyContent: "center"}}
            ListEmptyComponent={() => (
                <Text color="$gray100" textAlign="center" >
                    Não há exercícios registrados ainda.{"\n"} 
                    vamos fazer exercícios hoje?
                </Text>
            )}
            showsVerticalScrollIndicator={false}
        />
            
        </VStack>
    )
}