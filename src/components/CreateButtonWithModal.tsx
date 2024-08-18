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
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { useForm, Controller } from 'react-hook-form'
import { postRecord } from '../utils/recordFunction'

type FormData = {
  title: string
  time: number
}

export const CreateButtonWithModal = (props: { getRecords: () => void }) => {
  const { getRecords } = props
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: '',
      time: 0,
    },
  })

  const onSubmit = (data: FormData) => {
    postRecord(data)
    getRecords()
    modalClose()
  }

  const modalClose = () => {
    reset()
    onClose()
  }

  return (
    <>
      <Button onClick={onOpen} colorScheme='teal' data-testid='create-button'>
        新規登録
      </Button>

      <Modal isOpen={isOpen} onClose={modalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>新規登録フォーム</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Text mb='8px'>学習内容</Text>
              <Controller
                name='title'
                control={control}
                rules={{ required: '内容の入力は必須です' }}
                render={({ field }) => <Input {...field} />}
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
