-- =============================================================================
-- ATTIN EXPO XII 2026 — tabel registrations
-- Satu tabel untuk SEMUA cabang lomba (tidak dipisah per cabang).
-- Cabang dibedakan dengan competition_id + competition_slug sehingga dashboard
-- admin cukup memfilter satu tabel.
--
-- Struktur kolom mengikuti payload formulir terkini:
--   identitas peserta, identitas sekolah, pembayaran, dan status registrasi.
-- Kolom dokumen persyaratan, data guru pembimbing, dan data orang tua/wali
-- sudah dihapus karena tidak lagi dikumpulkan pada formulir.
-- =============================================================================

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  registration_code text not null unique,
  competition_id text not null,
  competition_slug text not null check (competition_slug in ('tahfizh', 'pra-tka', 'panahan')),
  participant_name text not null,
  nickname text not null default '',
  gender text check (gender in ('Laki-laki', 'Perempuan')),
  birth_date date,
  birth_place text not null default '',
  nisn text not null check (nisn ~ '^[0-9]{10}$'),
  grade text not null,
  school_name text not null,
  school_address text not null default '',
  city text not null,
  payment_sender_bank text not null default '',
  payment_sender_name text not null default '',
  payment_proof_url text,
  specific_data jsonb not null default '{}'::jsonb,
  registration_status text not null default 'pending' check (registration_status in ('pending', 'verified', 'rejected')),
  payment_status text not null default 'pending' check (payment_status in ('pending', 'verified', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Filter dashboard admin: semua pendaftaran / Tahfizh / Pra-TKA / Panahan
create index if not exists registrations_competition_slug_idx on public.registrations (competition_slug);
create index if not exists registrations_competition_id_idx on public.registrations (competition_id);
create index if not exists registrations_created_at_idx on public.registrations (created_at desc);
create index if not exists registrations_status_idx on public.registrations (registration_status, payment_status);
create index if not exists registrations_city_idx on public.registrations (city);

-- Otomatis memperbarui updated_at setiap kali baris diperbarui admin.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists registrations_set_updated_at on public.registrations;
create trigger registrations_set_updated_at
  before update on public.registrations
  for each row execute function public.set_updated_at();

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

-- Peserta boleh membaca pendaftaran (kode registrasi dipakai sebagaitoken cek).
create policy "public can read registrations"
  on public.registrations
  for select
  to anon
  using (true);

-- Khusus panel admin: ubah status pembayaran & status registrasi.
-- Aktifkan policy berikut SESUDAH peran admin dibuat di Supabase Dashboard:
-- create policy "admin can update registrations"
--   on public.registrations for update to authenticated
--   using (true) with check (true);

-- =============================================================================
-- Bucket privat untuk bukti transfer
-- Kolom payment_proof_url menyimpan PATH di dalam bucket ini (bukan URL publik).
-- =============================================================================
insert into storage.buckets (id, name, public)
values ('registrations', 'registrations', false)
on conflict (id) do nothing;

create policy "public can upload payment proof"
  on storage.objects
  for insert
  to anon
  with check (bucket_id = 'registrations');
