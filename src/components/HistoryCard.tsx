import { HistoryDTO } from "@dtos/HistoryDTO"
import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed"

type Props = {
    data: HistoryDTO;
}

export const HistoryCard = ({data}: Props) => {
    return (
        <HStack w="$full" px="$5" py="$3" mb="$3" bg="$gray600" rounded="$md" alignItems="center" justifyContent="space-between">
            <VStack mr="$5" >
                <Heading color="$white" fontSize="$md" fontFamily="$heading" textTransform="capitalize" numberOfLines={1} >
                    {data.group}
                </Heading>

                <Text color="$gray100" fontSize="$lg" textTransform="capitalize" numberOfLines={1} >
                    {data.name} 
                </Text>
            </VStack>
            <Text color="$gray300" fontSize="$md" >
                {data.hour}
            </Text>
        </HStack>
    )
}