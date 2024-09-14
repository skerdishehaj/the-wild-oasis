import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://tkbnuwaqgckhyhtcwllj.supabase.co';
// RLS - Row Level Security
// With this key client can access only the data we have given permission to by configuring RLS
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrYm51d2FxZ2NraHlodGN3bGxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkxMzQ5NzQsImV4cCI6MjAxNDcxMDk3NH0.lausY8197cG9z6qWdxe69787M-TFe4kL9hHinmL8xpE';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
