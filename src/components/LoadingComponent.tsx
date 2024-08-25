import { Box, Spinner, Stack, Text } from '@chakra-ui/react'

export const LoadingComponent = () => {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='100vh'
    >
      <Stack align='center'>
        <Spinner color='teal' size='xl' />
        <Text color='gray.500'>Loading, please wait...</Text>
      </Stack>
    </Box>
  )
}
