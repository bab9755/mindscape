
create table entries (
id uuid primary key default gen_random_uuid(),
user_id uuid references auth.users not null,
transcript text not null,
created_at timestamp with time zone default now(),
updated_at timestamp with time zone default now(),
emotions jsonb not null

);

-- Enable RLS
alter table entries enable row level security;


create policy "Users can only access their own todos"
on entries for all
to authenticated
using ((select auth.uid()) = user_id);