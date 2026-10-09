import { env, isSupabaseConfigured } from './env.js'

async function getSupabaseClient() {
  if (!isSupabaseConfigured) return null
  const { createClient } = await import('@supabase/supabase-js')
  return createClient(env.supabaseUrl, env.supabaseAnonKey)
}

// 1. Fetch Site Settings (Hero, Bank, Contact, dll)
export async function getSiteSettings() {
  const client = await getSupabaseClient()
  if (!client) return {}
  
  const { data, error } = await client
    .from('site_settings')
    .select('key, value')
    
  if (error || !data) return {}
  
  const settings: Record<string, string> = {}
  data.forEach(item => {
    settings[item.key] = item.value
  })
  return settings
}

// 2. Fetch Page Sections (Teks About, Teks Header Pendaftaran, dll)
export async function getPageSections(pageName?: string) {
  const client = await getSupabaseClient()
  if (!client) return {}
  
  let query = client.from('page_sections').select('*').eq('is_active', true)
  if (pageName) query = query.eq('page_name', pageName)
  
  const { data, error } = await query
  if (error || !data) return {}

  const sections: Record<string, any> = {}
  data.forEach(item => {
    sections[item.section_id] = item
  })
  return sections
}

// 3. Fetch UI Cards (Manfaat, Keunggulan, dll)
export async function getUiCards(sectionId: string) {
  const client = await getSupabaseClient()
  if (!client) return []
  
  const { data, error } = await client
    .from('ui_cards')
    .select('*')
    .eq('section_id', sectionId)
    .eq('is_active', true)
    .order('display_order', { ascending: true })
    
  if (error || !data) return []
  return data
}

// 4. Fetch Competitions (Data Lomba, Kuota, Biaya)
export async function getCompetitions() {
  const client = await getSupabaseClient()
  if (!client) return []
  
  const { data, error } = await client
    .from('competitions')
    .select('*')
    .eq('is_active', true)
    
  if (error || !data) return []
  return data
}

// 5. Fetch Timeline (Jadwal)
export async function getTimeline() {
  const client = await getSupabaseClient()
  if (!client) return []
  
  const { data, error } = await client
    .from('timeline_events')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
    
  if (error || !data) return []
  return data
}

// 6. Fetch FAQs
export async function getFaqs() {
  const client = await getSupabaseClient()
  if (!client) return []
  
  const { data, error } = await client
    .from('faqs')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
    
  if (error || !data) return []
  return data
}
