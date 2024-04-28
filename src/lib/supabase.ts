import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { Database } from '../../database.types'

const supabaseUrl = "https://gdpfzyqiefbjzjhiamud.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkcGZ6eXFpZWZianpqaGlhbXVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQwMjA1NjcsImV4cCI6MjAxOTU5NjU2N30.mFPfv5h4ZpZiQ5b93F91P5QaVmthvP51ZJIdKJf1iAo"

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})