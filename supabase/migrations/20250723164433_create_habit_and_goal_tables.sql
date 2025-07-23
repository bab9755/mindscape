create table if not exists habits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  title text not null,
  description text,
  weekly_frequency integer not null check (weekly_frequency between 1 and 7),
  duration integer not null,
  days_of_the_week integer[] 
);


create table if not exists goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  entry_id uuid references entries,
  habit_id uuid references habits,
  duration integer not null,
  title text not null,
  description text,
  why text not null
);



alter table goals enable row level security;
alter table habits enable row level security;

create policy "Users can access their own goals" on goals
  for all
  to authenticated
  using (user_id = auth.uid());

create policy "Users can access their own habits" on habits
  for all
  to authenticated
  using (user_id = auth.uid());
