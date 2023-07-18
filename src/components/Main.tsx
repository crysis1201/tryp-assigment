import { Stack, StackProps } from '@chakra-ui/react'

export const Main = (props: StackProps) => (
  <Stack
    spacing="1.5rem"
    width="100%"
    pt="4rem"
    px={{sm: "4rem", base: "1rem"}}
    {...props}
  />
)
