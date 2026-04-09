import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hgrbnnnfvhwauhtlqyvp.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhncmJubm5mdmh3YXVodGxxeXZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NTM2NDEsImV4cCI6MjA4OTQyOTY0MX0.TcxtabI6r7f7vh13atvfuEFgZlrmvuc0XvJtEjJRjQw'

export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null

export default supabase
