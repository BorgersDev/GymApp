import { Center, Spinner } from "@gluestack-ui/themed"

export const Loading = () => {
    return ( 
    <Center flex={1} bg="$gray700" >
        <Spinner size={40} color="$green500" />
    </Center>
    )
}