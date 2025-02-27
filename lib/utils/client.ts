import { createClient } from '@supabase/supabase-js'

// Import keys from .env and ensure they are set
const SUPABASE_URL = "https://zsrhvbqsmlruustctgni.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpzcmh2YnFzbWxydXVzdGN0Z25pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1OTIxMjEsImV4cCI6MjA1NjE2ODEyMX0.XLif0s2SSWdHTLywUZTc9o0czW_ERgLC9XNBTWckhnY"
const SUPABASE_SERVICE_ROLE = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpzcmh2YnFzbWxydXVzdGN0Z25pIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MDU5MjEyMSwiZXhwIjoyMDU2MTY4MTIxfQ.lstAy_vGspYK3_vT4WzjlFjgIou8WzPW8xWhjHSRGoM"

if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE) {
  throw new Error('Missing necessary environment variables');
}

// Initialize Supabase clients
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
export const supabaseAdminRole = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);
