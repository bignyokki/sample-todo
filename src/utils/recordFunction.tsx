import { supabase } from './supabase'
import type { PostgrestResponse } from '@supabase/supabase-js'
import { Record } from '../domains/record'

type PostRecordProps = Pick<Record, 'title' | 'time'>

export const getAllRecords = async () => {
  const { data, error }: PostgrestResponse<Record> = await supabase
    .from('study-record-2')
    .select('*')
  if (error) {
    throw new Error('データベースから取得できませんでした')
  }
  const records = data.map(
    (item) => new Record(item.id, item.title, item.time, item.created_at)
  )
  return records
}

export const postRecord = async (postRecord: PostRecordProps) => {
  const { error } = await supabase.from('study-record-2').insert(postRecord)
  if (error) {
    throw new Error('データベースに登録できませんでした')
  }
}

export const deleteRecord = async (id: number) => {
  const { error } = await supabase.from('study-record-2').delete().eq('id', id)
  if (error) {
    throw new Error('データベースから削除できませんでした')
  }
}

export const editRecord = async (id: number, data: PostRecordProps) => {
  const { error } = await supabase
    .from('study-record-2')
    .update(data)
    .eq('id', id)
  if (error) {
    throw new Error('データを更新できませんでした')
  }
}
