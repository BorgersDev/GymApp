import {
    ToastDescription,
    ToastTitle,
    Toast,
    Pressable,
    Icon,
    VStack,
    HStack
} from "@gluestack-ui/themed"
import { X } from "lucide-react-native"

type Props = {
    id: string;
    title: string;
    description?: string;
    action?: "error" | "success";
    onClose: () => void

}
export const ToastMessage = ({id, title, description, action="success", onClose}: Props) => {
    return (
        <Toast 
            nativeID={`toast-${id}`} 
            action={action} 
            bgColor={action === "success" ? "$green500" : "$red500"} 
            mt="$10"
            
        >
            <VStack space="xs" w="$full" >
                <HStack justifyContent="space-between">
                    <VStack>
                        
                        <ToastTitle color="$white" fontFamily="$heading">
                            {title}
                        </ToastTitle>
                        {description && (
                            <ToastDescription color="$white" fontFamily="$body" >
                                {description}
                            </ToastDescription>
                        )}
                    </VStack>
                    <Pressable  onPress={onClose} >
                        <Icon as={X} color="$coolGray50" size="md" />
                    </Pressable>
                </HStack>
            </VStack>

        </Toast>
    )
}