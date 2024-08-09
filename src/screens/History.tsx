import { VStack } from "@gluestack-ui/themed"

import { HistoryCard } from "@components/HistoryCard"
import { ScreenHeader } from "@components/ScreenHeader"


export const History = () => {
    return (
        <VStack flex={1}>
            <ScreenHeader title="Histórico" />
            <HistoryCard />
        </VStack>
    )
}