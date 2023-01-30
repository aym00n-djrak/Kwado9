import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ldvwbxjavbumiboiiyjb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdndieGphdmJ1bWlib2lpeWpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM5NzUxMTYsImV4cCI6MTk4OTU1MTExNn0.2RwqUEKPEhM5SbEFjj24KtsF1ys-zep8FcLE4mX9fzk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
