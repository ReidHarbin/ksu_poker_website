create or replace function update_chip_total()
returns
  void
  language plpgsql
as $$
  declare current_session_id uuid;
  begin
    with latest_session as (
      select id
      from sessions
      where session_date = (select max(session_date) from sessions)
    )
    update players set chip_total = chip_total + ps.chip_delta from player_sessions ps 
    join latest_session ls on ps.session_id = ls.id
    where ps.player_id = players.id;
  end;
$$;