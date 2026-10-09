-- ==============================================================================
-- SKEMA DATABASE HEADLESS CMS & SISTEM REGISTRASI ATTIN EXPO XII 2026
-- Dirancang khusus untuk pengelolaan penuh dari Dashboard SQL Supabase
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

/* =========================================
   1. TABEL PENGATURAN SITUS UMUM (SITE SETTINGS)
   ========================================= */
-- Menyimpan semua teks global, meta data, SEO, hingga konfigurasi bank
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category VARCHAR(50) DEFAULT 'general' NOT NULL, -- 'seo', 'hero', 'contact', 'bank', 'footer'
    key VARCHAR(100) UNIQUE NOT NULL, 
    value TEXT NOT NULL,
    description TEXT, -- Panduan bagi Admin saat mengedit
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Memastikan kolom baru tertambah jika tabel sudah terlanjur dibuat di skema sebelumnya
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS category VARCHAR(50) DEFAULT 'general';

/* =========================================
   2. TABEL KONTEN HALAMAN (PAGE CONTENT)
   ========================================= */
-- Mengelola teks panjang, heading, dan deskripsi pada setiap section halaman
CREATE TABLE IF NOT EXISTS public.page_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_name VARCHAR(50) NOT NULL, -- 'beranda', 'pendaftaran'
    section_id VARCHAR(100) UNIQUE NOT NULL, -- 'about_section', 'registration_header'
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    content_html TEXT, -- Bisa berupa HTML, Markdown, atau Teks biasa
    is_active BOOLEAN DEFAULT true,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

/* =========================================
   3. TABEL DAFTAR CARD / BENEFIT (UI CARDS)
   ========================================= */
-- Mengelola list/cards di website (Benefit, Keunggulan, dsb)
CREATE TABLE IF NOT EXISTS public.ui_cards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section_id VARCHAR(100) REFERENCES public.page_sections(section_id) ON DELETE CASCADE,
    icon_name VARCHAR(50),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true
);

/* =========================================
   4. TABEL PERLOMBAAN (COMPETITIONS)
   ========================================= */
-- Pengaturan penuh cabang lomba
CREATE TABLE IF NOT EXISTS public.competitions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(50) UNIQUE NOT NULL, 
    name VARCHAR(100) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    tagline TEXT,
    description TEXT,
    icon_name VARCHAR(50),
    fee_amount INTEGER NOT NULL DEFAULT 0,
    fee_note VARCHAR(255),
    quota INTEGER NOT NULL DEFAULT 0,
    
    -- Konfigurasi Pendaftaran Khusus Lomba Ini
    form_config JSONB DEFAULT '[]'::jsonb, -- Array definisi input spesifik lomba
    categories JSONB DEFAULT '[]'::jsonb, -- Array opsi kategori lomba (misal PA/PI, Kelas 1-3)
    
    is_active BOOLEAN DEFAULT true,
    registration_deadline TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Memastikan kolom baru tertambah jika tabel sudah terlanjur dibuat di skema sebelumnya
ALTER TABLE public.competitions ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.competitions ADD COLUMN IF NOT EXISTS fee_note VARCHAR(255);
ALTER TABLE public.competitions ADD COLUMN IF NOT EXISTS form_config JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.competitions ADD COLUMN IF NOT EXISTS categories JSONB DEFAULT '[]'::jsonb;

/* =========================================
   5. TABEL JADWAL (TIMELINE) & FAQ
   ========================================= */
CREATE TABLE IF NOT EXISTS public.timeline_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(150) NOT NULL,
    description TEXT,
    event_date TIMESTAMP WITH TIME ZONE,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(50) DEFAULT 'general',
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

/* =========================================
   6. TABEL REGISTRASI (PESERTA LOMBA)
   ========================================= */
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    registration_code VARCHAR(50) UNIQUE NOT NULL,
    competition_id VARCHAR(50) NOT NULL,
    competition_slug VARCHAR(50) NOT NULL REFERENCES public.competitions(slug) ON DELETE RESTRICT,
    participant_name VARCHAR(255) NOT NULL,
    nickname VARCHAR(100),
    gender VARCHAR(20),
    birth_date DATE,
    birth_place VARCHAR(100),
    grade VARCHAR(50),
    school_name VARCHAR(255) NOT NULL,
    school_address TEXT,
    city VARCHAR(100),
    payment_sender_bank VARCHAR(100),
    payment_sender_name VARCHAR(255),
    payment_proof_url TEXT,
    specific_data JSONB DEFAULT '{}'::jsonb,
    registration_status VARCHAR(50) DEFAULT 'pending',
    payment_status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

/* =========================================
   FUNGSI & TRIGGER UNTUK UPDATED_AT
   ========================================= */
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_reg_modtime ON public.registrations;
CREATE TRIGGER update_reg_modtime BEFORE UPDATE ON public.registrations FOR EACH ROW EXECUTE FUNCTION update_modified_column();

DROP TRIGGER IF EXISTS update_comp_modtime ON public.competitions;
CREATE TRIGGER update_comp_modtime BEFORE UPDATE ON public.competitions FOR EACH ROW EXECUTE FUNCTION update_modified_column();

DROP TRIGGER IF EXISTS update_site_modtime ON public.site_settings;
CREATE TRIGGER update_site_modtime BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION update_modified_column();

DROP TRIGGER IF EXISTS update_page_modtime ON public.page_sections;
CREATE TRIGGER update_page_modtime BEFORE UPDATE ON public.page_sections FOR EACH ROW EXECUTE FUNCTION update_modified_column();

/* =========================================
   INDEXING
   ========================================= */
CREATE INDEX IF NOT EXISTS idx_reg_code ON public.registrations(registration_code);
CREATE INDEX IF NOT EXISTS idx_reg_school ON public.registrations(school_name);
CREATE INDEX IF NOT EXISTS idx_site_settings_category ON public.site_settings(category);

/* =========================================
   ROW LEVEL SECURITY (RLS) POLICIES
   ========================================= */
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ui_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- BACA (SELECT): Publik bisa membaca semua konten CMS
DROP POLICY IF EXISTS "Public select settings" ON public.site_settings;
CREATE POLICY "Public select settings" ON public.site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public select sections" ON public.page_sections;
CREATE POLICY "Public select sections" ON public.page_sections FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public select ui cards" ON public.ui_cards;
CREATE POLICY "Public select ui cards" ON public.ui_cards FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public select competitions" ON public.competitions;
CREATE POLICY "Public select competitions" ON public.competitions FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public select timeline" ON public.timeline_events;
CREATE POLICY "Public select timeline" ON public.timeline_events FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public select faqs" ON public.faqs;
CREATE POLICY "Public select faqs" ON public.faqs FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public select registrations" ON public.registrations;
CREATE POLICY "Public select registrations" ON public.registrations FOR SELECT USING (true);

-- TULIS (INSERT): Publik HANYA bisa mendaftar (Registrations)
DROP POLICY IF EXISTS "Public insert registrations" ON public.registrations;
CREATE POLICY "Public insert registrations" ON public.registrations FOR INSERT WITH CHECK (true);

-- KELOLA (ALL): Admin punya akses penuh ke semuanya
DROP POLICY IF EXISTS "Admin manage settings" ON public.site_settings;
CREATE POLICY "Admin manage settings" ON public.site_settings USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin manage sections" ON public.page_sections;
CREATE POLICY "Admin manage sections" ON public.page_sections USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin manage ui_cards" ON public.ui_cards;
CREATE POLICY "Admin manage ui_cards" ON public.ui_cards USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin manage competitions" ON public.competitions;
CREATE POLICY "Admin manage competitions" ON public.competitions USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin manage timeline" ON public.timeline_events;
CREATE POLICY "Admin manage timeline" ON public.timeline_events USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin manage faqs" ON public.faqs;
CREATE POLICY "Admin manage faqs" ON public.faqs USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin manage registrations" ON public.registrations;
CREATE POLICY "Admin manage registrations" ON public.registrations USING (auth.role() = 'authenticated');

/* =========================================
   STORAGE BUCKETS (UPLOAD BUKTI)
   ========================================= */
INSERT INTO storage.buckets (id, name, public) 
VALUES ('registrations', 'registrations', false) ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public uploads" ON storage.objects;
CREATE POLICY "Public uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'registrations');

DROP POLICY IF EXISTS "Admin reads storage" ON storage.objects;
CREATE POLICY "Admin reads storage" ON storage.objects FOR SELECT USING (bucket_id = 'registrations' AND auth.role() = 'authenticated');

/* =========================================
   SEEDING (DATA AWAL) AGAR SIAP PAKAI
   ========================================= */
-- SETTINGS
INSERT INTO public.site_settings (category, key, value, description) VALUES
('hero', 'hero_title', 'ATTIN EXPO XII 2026', 'Judul Utama di Beranda'),
('hero', 'hero_subtitle', 'Ajang Prestasi, Dakwah, dan Sportivitas Islami Jenjang SD/MI Se-Sumatera Barat', 'Teks kecil di bawah judul'),
('contact', 'contact_whatsapp', '081234567890', 'No WhatsApp Panitia'),
('bank', 'bank_name', 'BSI (Bank Syariah Indonesia)', 'Nama Bank Pembayaran'),
('bank', 'bank_account', '1234567890', 'Nomor Rekening'),
('bank', 'bank_owner', 'Panitia Attin Expo', 'Atas Nama Rekening'),
('registration', 'registration_notice', 'Harap isi data sesuai KK/Akte Kelahiran', 'Catatan di halaman pendaftaran')
ON CONFLICT (key) DO NOTHING;

-- PAGE SECTIONS
INSERT INTO public.page_sections (page_name, section_id, title, subtitle, content_html) VALUES
('beranda', 'about_section', 'Tentang ATTIN EXPO XII', 'Kompetisi Bergengsi Tingkat Provinsi', 'Wadah kompetisi bergengsi tingkat provinsi Sumatera Barat yang melahirkan generasi Qurani...'),
('pendaftaran', 'registration_header', 'Formulir Pendaftaran', 'Pintu Resmi Delegasi Sekolah', 'Panduan pengisian data santri, identitas sekolah, dan verifikasi berkas administrasi musabaqah.')
ON CONFLICT (section_id) DO NOTHING;

-- COMPETITIONS
INSERT INTO public.competitions (slug, name, full_name, tagline, description, icon_name, fee_amount, quota, form_config)
VALUES 
('tahfizh', 'Tahfizh Al-Qur''an', 'Lomba Tahfizh Al-Qur''an', 'Melahirkan Generasi Qur''ani', 'Lomba Hafalan Al-Qur''an dengan tajwid dan tartil terbaik.', 'menu_book', 150000, 100, '[{"name": "nama_pa", "label": "Nama Peserta Putra"}, {"name": "nama_pi", "label": "Nama Peserta Putri"}]'),
('pra-tka', 'Pra-TKA', 'Lomba Pra-TKA', 'Membangun Karakter Usia Dini', 'Lomba akademik dasar untuk tingkat usia dini dan TK.', 'child_care', 100000, 50, '[]'),
('panahan', 'Panahan', 'Lomba Panahan Tradisional', 'Melatih Fokus dan Ketangkasan', 'Kompetisi memanah tingkat dasar dengan jarak 10 meter.', 'track_changes', 120000, 80, '[]')
ON CONFLICT (slug) DO NOTHING;

-- TIMELINE
INSERT INTO public.timeline_events (title, description, event_date, display_order) VALUES
('Pendaftaran Dibuka', 'Registrasi online gelombang I mulai dibuka.', '2026-09-01 00:00:00+07', 1),
('Batas Akhir Pendaftaran', 'Sistem registrasi akan ditutup secara otomatis.', '2026-11-18 23:59:59+07', 2),
('Technical Meeting', 'Penjelasan Juknis & Pengundian Nomor Tampil.', '2026-11-19 14:00:00+07', 3),
('Pelaksanaan Lomba', 'Hari H Pelaksanaan ATTIN EXPO XII.', '2026-11-20 08:00:00+07', 4)
ON CONFLICT DO NOTHING;
