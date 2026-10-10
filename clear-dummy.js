import { createClient } from '@supabase/supabase-js';

const url = 'https://lpbzgmzffhrfgbjqillf.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwYnpnbXpmZmhyZmdianFpbGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE1MDg2NzgsImV4cCI6MjEwNzA4NDY3OH0.kZjkcVhnPKVFT7Zxl6rF89yzn9nioe4QQzro5obZ2hI';

const supabase = createClient(url, key);

async function run() {
  const { data: fetch, error: fetchErr } = await supabase
    .from('registrations')
    .select('registration_code, school_name');
  
  console.log('Fetched:', fetch);
  
  if (fetch && fetch.length > 0) {
    for (const row of fetch) {
      const { data, error } = await supabase
        .from('registrations')
        .delete()
        .eq('registration_code', row.registration_code);
      console.log('Delete status for', row.registration_code, ':', error || 'success');
    }
  }
}

run();

