create table players (
  id uuid default uuid_generate_v4() primary key,
  ksu_netid text,
  name text not null,
  chip_total int not null default 0
);

create table seasons (
  id uuid default uuid_generate_v4() primary key,
  start_date date unique not null default current_date,
  active boolean default false
);

create table sessions (
  id uuid default uuid_generate_v4() primary key,
  season_id uuid references seasons(id),
  session_date date not null default current_date,
  unique(session_date, season_id)
);

create table player_sessions (
  id uuid default uuid_generate_v4() primary key,
  player_id uuid references players(id),
  session_id uuid references sessions(id),
  chip_delta int not null default 0,
  unique(player_id, session_id)
);