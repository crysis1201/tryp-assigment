import { Stack, StackProps } from '@chakra-ui/react'

export const Main = (props: StackProps) => (
  <Stack
    spacing="1.5rem"
    width="100%"
    pt="4rem"
    px="4rem"
    overflowY={"scroll"} 
    maxHeight={"50rem"} 
    {...props}
  />
)
