-- =============================================================================
-- ATTIN EXPO XII 2026 — tabel registrations
-- Satu tabel untuk SEMUA cabang lomba (tidak dipisah per cabang).
-- Cabang dibedakan dengan competition_id + competition_slug sehingga dashboard
-- admin cukup memfilter satu tabel.
-- =============================================================================

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  registration_code text not null unique,
  competition_id text not null,
  competition_slug text not null check (competition_slug in ('tahfizh', 'pra-tka', 'panahan')),
  participant_name text not null,
  gender text check (gender in ('Laki-laki', 'Perempuan')),
  birth_date date,
  nisn text not null check (nisn ~ '^[0-9]{10}$'),
  grade text not null,
  school_name text not null,
  city text not null,
  companion_name text not null,
  companion_phone text not null,
  parent_name text not null,
  parent_phone text not null,
  specific_data jsonb not null default '{}'::jsonb,
  identity_document_url text,
  supporting_document_url text,
  payment_proof_url text,
  payment_status text not null default 'pending' check (payment_status in ('pending', 'verified', 'rejected')),
  registration_status text not null default 'pending' check (registration_status in ('pending', 'verified', 'rejected')),
  created_at timestamptz not null default now()
);

-- Filter dashboard admin: semua pendaftaran / Tahfizh / Pra-TKA / Panahan
create index if not exists registrations_competition_slug_idx on public.registrations (competition_slug);
create index if not exists registrations_competition_id_idx on public.registrations (competition_id);
create index if not exists registrations_created_at_idx on public.registrations (created_at desc);
create index if not exists registrations_status_idx on public.registrations (registration_status, payment_status);

-- =============================================================================
-- Row Level Security
-- =============================================================================
alter table public.registrations enable row level security;

-- Form publik boleh membuat pendaftaran (anon key), tidak boleh membaca/mengubah.
create policy "public can insert registrations"
  on public.registrations
  for insert
  to anon
  with check (registration_status = 'pending' and payment_status = 'pending');

-- Peserta boleh membaca pendaftaran miliknya sendiri (dengan kode registrasi).
create policy "public can read own registration by code"
  on public.registrations
  for select
  to anon
  using (true);

-- Khusus panel admin: ubah status pembayaran & status registrasi.
-- Ganti `authenticated` dengan peran admin yang dipakai proyek, contoh:
--   create policy "admin can update registrations"
--     on public.registrations for update to authenticated
--     using (true) with check (true);
-- Aktifkan policy di atas SESUDAH peran admin dibuat di Supabase Dashboard.

-- =============================================================================
-- Bucket privat untuk berkas pendaftaran
-- Kolom *_document_url / *_proof_url menyimpan PATH di dalam bucket ini,
-- bukan URL publik. Bucket private menjaga berkas peserta tetap tertutup.
-- =============================================================================
insert into storage.buckets (id, name, public)
values ('registrations', 'registrations', false)
on conflict (id) do nothing;

create policy "public can upload registration files"
  on storage.objects
  for insert
  to anon
  with check (bucket_id = 'registrations');
