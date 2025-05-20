create or replace function get_leaderboard()
returns
  table (
    name text, 
    chip_delta float4,
    chip_total float4
  )
  language plpgsql
as $$
  begin
    return query
    with latest_session as (
      select id from sessions
      where session_date = (select max(session_date) from sessions)
    )
    
    select players.name, players.chip_total, COALESCE(ps.chip_delta, 0) from players
    join player_sessions ps on players.id = ps.player_id
    cross join latest_session
    where ps.session_id = latest_session.id or players.active = TRUE

    union all

    select p.name, 0, p.chip_total from players p 
    where p.active = true
    and not exists (
      select 1 from player_sessions ps 
      cross join latest_session ls 
      where ps.player_id = p.id and ps.session_id = ls.id
    );
  end;
$$;