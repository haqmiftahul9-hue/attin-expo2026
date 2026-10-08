import fs from 'fs';

let repo = fs.readFileSync('src/lib/registrationsRepository.ts', 'utf-8');

const updateFunction = `
export async function updateRegistrationStatus(registrationCode: string, status: 'pending' | 'verified' | 'rejected'): Promise<boolean> {
  const client = await getSupabaseClient()
  if (!client) {
    const local = readLocal()
    const index = local.findIndex(r => r.registration_code === registrationCode)
    if (index !== -1) {
      local[index].registration_status = status
      if (status === 'verified') {
        local[index].payment_status = 'verified'
      }
      writeLocal(local)
      return true
    }
    return false
  }

  const { error } = await client
    .from('registrations')
    .update({ 
      registration_status: status,
      payment_status: status === 'verified' ? 'verified' : undefined 
    })
    .eq('registration_code', registrationCode)
    
  return !error
}
`;

if (!repo.includes('updateRegistrationStatus')) {
  repo += updateFunction;
  fs.writeFileSync('src/lib/registrationsRepository.ts', repo);
}
