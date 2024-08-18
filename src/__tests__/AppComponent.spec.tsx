import App from '../App'
import { act, fireEvent, render, screen } from '@testing-library/react'
import * as recordFunction from '../utils/recordFunction'

// supabaseをモック
jest.mock('../utils/supabase')

jest.spyOn(recordFunction, 'getAllRecords').mockResolvedValue([
  { id: 1, title: 'Record 1', time: 1, created_at: '2024-12-1' },
  { id: 2, title: 'Record 2', time: 2, created_at: '2024-12-1' },
])

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks() // 各テストの前にモックをクリア
  })

  it('レコードを取得前はローディング画面が表示されること', () => {
    render(<App />)
    expect(screen.getByText('Loading, please wait...')).toBeInTheDocument()
  })

  it('レコードを取得後は学習記録が表示されること', async () => {
    await act(async () => {
      render(<App />)
    })
    expect(screen.getByText('Record 1')).toBeInTheDocument()
  })

  it('レコード取得後は新規登録ボタンが表示されていること', async () => {
    await act(async () => {
      render(<App />)
    })
    expect(screen.getByTestId('create-button')).toBeInTheDocument()
  })

  it('新規登録ボタンを押すとモーダルが表示され、モーダルのタイトルが表示されていること', async () => {
    await act(async () => {
      render(<App />)
    })
    fireEvent.click(screen.getByTestId('create-button'))
    expect(screen.getByText('新規登録フォーム')).toBeInTheDocument()
  })
})
