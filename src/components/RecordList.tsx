import { useEffect, useState } from 'react'
import { deleteRecord } from '../utils/recordFunction'
import type { Record } from '../domains/record'
import type { FC } from 'react'
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { MdDelete } from 'react-icons/md'

export const RecordList: FC<{
  records: Record[]
  getRecords: () => void
}> = (props) => {
  const { records, getRecords } = props
  const targetTime = 1000 // 目標時間
  const [sumTime, setSumTime] = useState(0)

  useEffect(() => {
    const _sumTime = records.reduce((sum, currentRecord) => {
      return sum + currentRecord.time
    }, 0)
    setSumTime(_sumTime)
  }, [records])

  const onClickDelete = async (id: number) => {
    await deleteRecord(id)
    getRecords()
  }

  return (
    <TableContainer width='100%'>
      <Table variant='simple'>
        <TableCaption>合計時間：{`${sumTime}/${targetTime}(h)`}</TableCaption>
        <Thead>
          <Tr>
            <Th>内容</Th>
            <Th>時間</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {records.map((record) => {
            return (
              <Tr key={record.id}>
                <Td>{record.title}</Td>
                <Td>{record.time}時間</Td>
                <Td>
                  <MdDelete
                    onClick={() => onClickDelete(record.id)}
                    data-testid={'delete-' + record.id}
                    style={{ cursor: 'pointer' }}
                  />
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
