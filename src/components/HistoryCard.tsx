import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed"


export const HistoryCard = () => {
    return (
        <HStack w="$full" px="$5" py="$3" mb="$3" bg="$gray600" rounded="$md" alignItems="center" justifyContent="space-between">
            <VStack mr="$5" >
                <Heading color="$white" fontSize="$md" fontFamily="$heading" textTransform="capitalize" >
                    Costas
                </Heading>

                <Text color="$gray100" fontSize="$lg" textTransform="capitalize" >
                    Puxada Frontal
                </Text>
            </VStack>
            <Text color="$gray300" fontSize="$md" >
                08:56
            </Text>
        </HStack>
    )
}