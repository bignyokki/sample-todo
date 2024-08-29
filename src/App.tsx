import { Box, Button, Heading, Stack, useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { getAllRecords } from './utils/recordFunction'
import { Record } from './domains/record'
import { RecordList } from './components/RecordList'
import { LoadingComponent } from './components/LoadingComponent'
import { CreateAndEditModal } from './components/CreateAndEditModal'

function App() {
  const [records, setRecord] = useState<Record[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const disclosure = useDisclosure()

  const getRecords = async () => {
    const _records = await getAllRecords()
    setRecord(_records)
  }

  useEffect(() => {
    const asyncFunction = async () => {
      await getRecords()
      setIsLoading(false)
    }
    asyncFunction()
  }, [])

  if (isLoading) {
    return <LoadingComponent />
  }

  return (
    <>
      <Box display='flex' justifyContent='center'>
        <Stack
          align='center'
          spacing={4}
          width='100%'
          maxWidth='600px'
          mx='auto'
        >
          <Heading data-testid='title'>学習記録一覧v2</Heading>
          <Box width='100%' textAlign='right'>
            <Button
              onClick={disclosure.onOpen}
              colorScheme='teal'
              data-testid='create-button'
            >
              新規登録
            </Button>
            <CreateAndEditModal
              disclosure={disclosure}
              getRecords={() => getRecords()}
            />
          </Box>
          <RecordList records={records} getRecords={() => getRecords()} />
        </Stack>
      </Box>
    </>
  )
}

export default App
