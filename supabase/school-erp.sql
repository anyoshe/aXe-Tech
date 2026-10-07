-- School ERP tables (run in Supabase SQL Editor after schema.sql)
-- Multi-tenant via school_id

create table if not exists public.erp_students (
  id text primary key,
  school_id text not null,
  name text not null,
  klass text not null default '',
  roll integer not null default 0,
  fees_due numeric(12,2) not null default 0,
  payments jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists erp_students_school_idx on public.erp_students (school_id);

create table if not exists public.erp_teachers (
  id text primary key,
  school_id text not null,
  name text not null,
  subject text not null default '',
  created_at timestamptz not null default now()
);
create index if not exists erp_teachers_school_idx on public.erp_teachers (school_id);

create table if not exists public.erp_subjects (
  id text primary key,
  school_id text not null,
  name text not null,
  created_at timestamptz not null default now()
);
create index if not exists erp_subjects_school_idx on public.erp_subjects (school_id);

create table if not exists public.erp_books (
  id text primary key,
  school_id text not null,
  title text not null,
  author text not null default '',
  qty integer not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists erp_books_school_idx on public.erp_books (school_id);

create table if not exists public.erp_issues (
  id text primary key,
  school_id text not null,
  book_id text not null,
  student_id text not null,
  issued_at timestamptz not null default now(),
  returned_at timestamptz
);
create index if not exists erp_issues_school_idx on public.erp_issues (school_id);

create table if not exists public.erp_invoices (
  id text primary key,
  school_id text not null,
  student_id text not null,
  amount numeric(12,2) not null default 0,
  paid_amount numeric(12,2) not null default 0,
  issued_at timestamptz not null default now()
);
create index if not exists erp_invoices_school_idx on public.erp_invoices (school_id);

create table if not exists public.erp_expenses (
  id text primary key,
  school_id text not null,
  description text not null default '',
  amount numeric(12,2) not null default 0,
  expense_date date not null default current_date,
  created_at timestamptz not null default now()
);
create index if not exists erp_expenses_school_idx on public.erp_expenses (school_id);

create table if not exists public.erp_assignments (
  id text primary key,
  school_id text not null,
  title text not null,
  klass text not null default '',
  subject text not null default '',
  due_date date,
  created_at timestamptz not null default now()
);
create index if not exists erp_assignments_school_idx on public.erp_assignments (school_id);

-- Open policies for setup (tighten later with auth)
do $$
declare
  t text;
begin
  foreach t in array array[
    'erp_students','erp_teachers','erp_subjects','erp_books',
    'erp_issues','erp_invoices','erp_expenses','erp_assignments'
  ]
  loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "erp_all_%s" on public.%I', t, t);
    execute format(
      'create policy "erp_all_%s" on public.%I for all to anon, authenticated using (true) with check (true)',
      t, t
    );
  end loop;
end $$;
