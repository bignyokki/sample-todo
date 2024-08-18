export const supabase = {
  from: jest.fn(() => ({
    select: jest.fn().mockResolvedValue({
      data: [
        { id: 1, title: 'Initial Record', time: 10, created_at: '2024-10-12' },
      ],
      error: null,
    }),
    insert: jest.fn().mockResolvedValue({ error: null }),
    delete: jest.fn().mockResolvedValue({ data: [], error: null }),
    eq: jest.fn().mockReturnThis(),
  })),
}
