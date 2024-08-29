import {
  Text,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
  UseDisclosureReturn,
} from '@chakra-ui/react'
import { useForm, Controller } from 'react-hook-form'
import { postRecord, editRecord } from '../utils/recordFunction'
import type { Record } from '../domains/record'
import { useEffect } from 'react'

type FormData = {
  title: string
  time: number
}

type Props = {
  getRecords: () => void
  disclosure: UseDisclosureReturn
  formParams?: Record
}

export const CreateAndEditModal = (props: Props) => {
  const { getRecords, disclosure, formParams } = props
  const { isOpen, onClose } = disclosure

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: formParams?.title || '',
      time: formParams?.time || 0,
    },
  })

  useEffect(() => {
    if (formParams) {
      setValue('title', formParams.title)
      setValue('time', formParams.time)
    }
  }, [formParams, setValue])

  const onSubmit = async (data: FormData) => {
    if (formParams === undefined) {
      await postRecord(data)
    } else {
      await editRecord(formParams.id, data)
    }
    getRecords()
    modalClose()
  }

  const modalClose = () => {
    reset()
    onClose()
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={modalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {formParams === undefined ? '新規登録フォーム' : '編集フォーム'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Text mb='8px'>学習内容</Text>
              <Controller
                name='title'
                control={control}
                rules={{ required: '内容の入力は必須です' }}
                render={({ field }) => (
                  <Input {...field} data-testid='title-input-field' />
                )}
              />
              {errors.title && (
                <Text color='red.500'>{errors.title.message}</Text>
              )}

              <Text mb='8px' mt='4'>
                学習時間
              </Text>
              <Controller
                name='time'
                control={control}
                rules={{ required: '時間の入力は必須です', min: 0 }}
                render={({ field }) => (
                  <NumberInput
                    {...field}
                    onChange={(valueString, valueNumber) => {
                      // バックスペースでフィールドが空になった場合の処理
                      if (valueString === '') {
                        field.onChange(0) // フィールドが空の場合は 0 をセット
                      } else {
                        field.onChange(valueNumber)
                      }
                    }}
                    min={0}
                    data-testid='time-input-field'
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                )}
              />
              {errors.time && (
                <Text color='red.500'>学習時間を入力してください</Text>
              )}
            </form>
          </ModalBody>

          <ModalFooter>
            <Box width='100%' display='flex' justifyContent='space-between'>
              <Button variant='outline' onClick={modalClose}>
                キャンセル
              </Button>
              <Button
                colorScheme='teal'
                mr={3}
                onClick={handleSubmit(onSubmit)}
                data-testid='submit-button'
              >
                登録
              </Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
