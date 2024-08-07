import { ComponentProps } from "react"
import { Input as GSInput, InputField } from "@gluestack-ui/themed"

type Props = ComponentProps<typeof InputField>

export const Input = ({...rest}: Props) => {
    return (
        <GSInput 
         bg="$gray700" 
         h="$12" px="$4" 
         borderWidth="$0" 
         borderRadius="$lg" 
         $focus={{
            borderWidth: 1,
            borderColor: "$green500"
         }}
        >
            <InputField color="$white" fontFamily="$body" placeholderTextColor="$gray300" {...rest} />
        </GSInput>
    )
}