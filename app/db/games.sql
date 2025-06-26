create tables games (
    id uuid primary key default gen_random_uuid(),
    name text not null, 
    password text,
    user_count integer not null default 1,
    question_count integer not null default 10, 
    time_minutes integer not null default 10, 
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    created_by uuid not null references users(id) on delete cascade,
    game_state jsonb not null default '{}'::jsonb,
    game_type text not null default 'hotseat',
    game_mode text not null default 'standard',
    game_status text not null default 'waiting',
);

alter table games enable row level security;
create policy "allow authenticated users to insert games"
    on games
    for insert
    using (auth.uid() is not null);

create policy "allow authenticated users to select games"
    on games
    for select
    using (auth.uid() is not null);

create policy "allow authenticated users to update their own games"
    on games
    for update
    using (auth.uid() = created_by);

create policy "allow authenticated users to delete their own games"
    on games
    for delete
    using (auth.uid() = created_by);    

