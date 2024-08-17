import { Box, Heading, Stack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { getAllRecords } from './utils/recordFunction'
import { Record } from './domains/record'
import { RecordList } from './components/RecordList'
import { LoadingComponent } from './components/LoadingComponent'
import { CreateButtonWithModal } from './components/CreateButtonWithModal'

function App() {
  const [records, setRecord] = useState<Record[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const getRecords = async () => {
    const _records = await getAllRecords()
    setRecord(_records)
  }

  useEffect(() => {
    getRecords()
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <LoadingComponent />
  }

  return (
    <>
      <Box display='flex' justifyContent='center'>
        <Stack align='center'>
          <Heading data-testid='title'>学習記録一覧v2</Heading>
          <CreateButtonWithModal getRecords={() => getRecords()} />
          <RecordList records={records} getRecords={() => getRecords()} />
        </Stack>
      </Box>
    </>
  )
}

export default App
