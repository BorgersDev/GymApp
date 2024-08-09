import { Heading, HStack, Icon, Image, Text, VStack } from "@gluestack-ui/themed"
import { ChevronRight } from "lucide-react-native"
import { TouchableOpacity, TouchableOpacityProps } from "react-native"

type Props = TouchableOpacityProps

export const ExerciseCard = ({...rest}: Props) => {
    return (
        <TouchableOpacity {...rest} >
            <HStack bg="$gray500" alignItems="center" p="$2" pr="$4" rounded="$md" mb="$3" >
                <Image 
                    source={{uri: "https://i.pinimg.com/236x/ab/15/59/ab1559f962dfeaa5230acf7cc138abdd.jpg"}}  
                    alt="Imagem Exercício" 
                    w="$16"
                    h="$16"
                    rounded="$md"
                    mr="$4"
                    resizeMode="cover"
                />
                <VStack flex={1}>
                    <Heading color="$white" fontSize="$lg" fontFamily="$heading"> 
                        Rosca bíceps halter
                    </Heading>
                    <Text color="$gray200" fontSize="$sm"  mt="$1" numberOfLines={2}>
                        3 séries x 12 repetições
                    </Text>
                </VStack>
                <Icon as={ChevronRight} color="$gray300" size="md" />
            </HStack>
        </TouchableOpacity>
    )
}