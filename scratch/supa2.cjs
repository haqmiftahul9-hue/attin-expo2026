const { createClient } = require('@supabase/supabase-js');
const c = createClient('https://lpbzgmzffhrfgbjqillf.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwYnpnbXpmZmhyZmdianFpbGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE1MDg2NzgsImV4cCI6MjEwNzA4NDY3OH0.kZjkcVhnPKVFT7Zxl6rF89yzn9nioe4QQzro5obZ2hI');
(async()=>{
  const email='testadmin123@gmail.com';
  const { data, error } = await c.auth.signUp({ email, password:'Admin1234!' });
  console.log('signup:', JSON.stringify(error||data?.user?.id));
  const { data:d2, error:e2 } = await c.auth.signInWithPassword({ email, password:'Admin1234!' });
  console.log('signin:', JSON.stringify(e2||d2?.user?.id));
})();
