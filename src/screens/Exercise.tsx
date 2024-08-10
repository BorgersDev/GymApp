import { ScrollView, TouchableOpacity } from "react-native"

import { useNavigation } from "@react-navigation/native"
import { AppNavigationRoutesProps } from "@routes/app.routes"

import { Box, Heading, HStack, Icon, Image, Text, VStack } from "@gluestack-ui/themed"

import { ArrowLeft } from "lucide-react-native"

import BodySvg from "@assets/body.svg"
import SeriesSvg from "@assets/series.svg"
import RepetitionsSvg from "@assets/repetitions.svg"
import { Button } from "@components/Button"


export const Exercise = () => {
    const navigation = useNavigation<AppNavigationRoutesProps>()
    const handleGoBack = () => {
        navigation.goBack()
    }
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
                    Rosca bíceps
                </Heading>
                <HStack alignItems="center" >
                    <BodySvg />
                    
                    <Text color="$gray200" ml="$1" textTransform="capitalize" >
                        Bíceps
                    </Text>
                </HStack>
              </HStack>
             </VStack>

             <ScrollView
                contentContainerStyle={{flexGrow: 1, paddingBottom: 32}}
                showsVerticalScrollIndicator={false}
             >

                    <VStack p="$8" >
                        <Image 
                            source={{uri: "https://i.pinimg.com/236x/ab/15/59/ab1559f962dfeaa5230acf7cc138abdd.jpg"}} 
                            alt="imagem do exercício" 
                            mb="$3"
                            resizeMode="cover"
                            rounded="$lg"
                            w="$full"
                            h="$96"
                            />
                        <Box bg="$gray600" rounded="$md" pb="$4" px="$4">
                            <HStack alignItems="center" justifyContent="space-around" mb="$6" mt="$5">
                                <HStack>
                                    <SeriesSvg />
                                    <Text color="$gray200" ml="$2" >
                                        séries
                                    </Text>
                                </HStack>
                                <HStack>
                                    <RepetitionsSvg />
                                    <Text color="$gray200" ml="$2" >
                                    12 Repetições
                                    </Text>
                                </HStack>
                            </HStack>
                            <Button title="Marcar como concluído" />
                        </Box>
                        
                    </VStack>
           </ScrollView>

        </VStack>
    )
}