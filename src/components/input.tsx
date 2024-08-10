import { ComponentProps } from "react"
import { Input as GSInput, InputField } from "@gluestack-ui/themed"

type Props = ComponentProps<typeof InputField> & {
    isReadOnly?: boolean;
}

export const Input = ({isReadOnly,...rest}: Props) => {
    return (
        <GSInput  
         h="$12"  
         borderWidth="$0" 
         borderRadius="$lg" 
         $focus={{
            borderWidth: 1,
            borderColor: "$green500"
         }}
         isReadOnly={isReadOnly}
         opacity={isReadOnly ? 0.4 : 1}
        >
            <InputField 
                bg="$gray700"
                px="$4"
                color="$white" 
                fontFamily="$body" 
                placeholderTextColor="$gray300" 
                {...rest} />
        </GSInput>
    )
}