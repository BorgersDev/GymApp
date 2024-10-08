import { ComponentProps } from "react"
import { FormControl, FormControlError, FormControlErrorText, Input as GSInput, InputField } from "@gluestack-ui/themed"

type Props = ComponentProps<typeof InputField> & {
    errorMessage?: string | null;
    isInvalid?: boolean;
    isReadOnly?: boolean;
}

export const Input = ({isReadOnly, errorMessage= null, isInvalid= false,...rest}: Props) => {
    const invalid = !!errorMessage || isInvalid 
    return (
        <FormControl isInvalid={invalid} w="$full" mb="$2" >
            <GSInput  
            isInvalid={isInvalid}
            h="$12"  
            borderWidth="$0" 
            borderRadius="$lg" 

            $invalid={{
                borderWidth: 1,
                borderColor:"$red500"
            }}
            $focus={{
                borderWidth: 1,
                borderColor: invalid ? "$red500" : "$green500"
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

            <FormControlError>
                <FormControlErrorText color="$red500" >
                    {errorMessage}
                </FormControlErrorText>
            </FormControlError>

        </FormControl>
    )
}