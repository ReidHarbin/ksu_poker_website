create or replace function create_player(ksu_netid text, name text)
returns
  void
  language plpgsql
as $$
begin
  insert into players(ksu_netid, name) values(ksu_netid, name);
end;
$$;