import { createClient } from '@supabase/supabase-js';

const url = 'https://lpbzgmzffhrfgbjqillf.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwYnpnbXpmZmhyZmdianFpbGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE1MDg2NzgsImV4cCI6MjEwNzA4NDY3OH0.kZjkcVhnPKVFT7Zxl6rF89yzn9nioe4QQzro5obZ2hI';

const supabase = createClient(url, key);

async function run() {
  const { data, error } = await supabase
    .from('registrations')
    .select('school_name, registration_status')
    .eq('registration_status', 'verified');
  
  if (error) {
    console.error('Error fetching:', error);
  } else {
    console.log('Verified Count:', data.length);
    console.log('Verified Data:', data);
  }
}

run();

