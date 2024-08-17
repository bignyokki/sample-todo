import { Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { getAllRecords } from './utils/recordFunction'
import { Record } from './domains/record'
import { RecordList } from './components/RecordList'
import { LoadingComponent } from './components/LoadingComponent'

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
      <Heading data-testid='title'>学習記録一覧v2</Heading>
      <RecordList records={records} getRecords={() => getRecords()} />
    </>
  )
}

export default App
