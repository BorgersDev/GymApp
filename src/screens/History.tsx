import { useCallback, useState } from "react"
import { SectionList } from "react-native"
import { useFocusEffect } from "@react-navigation/native"

import { Heading, Text, useToast, VStack } from "@gluestack-ui/themed"

import { api } from "@services/api"

import { HistoryCard } from "@components/HistoryCard"
import { ScreenHeader } from "@components/ScreenHeader"
import { AppError } from "@utils/AppError"
import { ToastMessage } from "@components/ToastMessage"
import { Loading } from "@components/Loading"

import { HistoryByDayDTO } from "@dtos/HistoryByDay"


export const History = () => {
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const [exercises, setExercises] = useState<HistoryByDayDTO[]>([])

    const fetchHistory = async () => {
        try {
            setIsLoading(true);

            const response = await api.get('/history')
            setExercises(response.data)
        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : "Não foi possível carregar seu histórico"
            toast.show ({
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

    useFocusEffect(useCallback(() => {
        fetchHistory();
    }, []));
    return (
        <VStack flex={1}>
            <ScreenHeader title="Histórico de Exercícios" />

            
            
        {   isLoading ? <Loading /> :
            <SectionList 
            sections={exercises} 
            keyExtractor={item => item.id} 
            renderItem={({item}) => (<HistoryCard data={item} />)}
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
        />}
            
        </VStack>
    )
}