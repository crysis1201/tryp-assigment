import { Box, useRadio } from "@chakra-ui/react"

export const RadioCard = (props) => {
    const { getInputProps, getRadioProps } = useRadio(props)
  
    const input = getInputProps()
    const checkbox = getRadioProps()
  
    return (
      <Box as='label'>
        <input {...input} />
        <Box
          {...checkbox}
          cursor='pointer'
          borderWidth='1px'
          borderRadius='md'
          boxShadow='md'
          _checked={{
            bg: '#e3a7f9',
            color: 'black',
            borderColor: '#e3a7f9',
          }}
          _focus={{
            boxShadow: 'outline',
          }}
          px={5}
          py={2}
        >
          {props.children}
        </Box>
      </Box>
    )
  }