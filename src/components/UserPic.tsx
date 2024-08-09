import { ComponentProps } from "react"
import { Image } from "@gluestack-ui/themed"

type Props = ComponentProps<typeof Image>

export const UserPic = ({...rest}: Props) => {
    return (
        <Image rounded="$full" borderWidth="$2" borderColor="$gray400" bg="$gray500" {...rest} />
    )
}