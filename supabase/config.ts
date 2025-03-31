
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jdbwjasojowqmmhzehgb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkYndqYXNvam93cW1taHplaGdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyNTQ1MTQsImV4cCI6MjA1ODgzMDUxNH0.e6XdrRXLhKDHfSW4MUNAMwHiMKhY0UQVbIFpOTxUsyY';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
