create or replace function create_player_session(player_id uuid)
returns
  void
  language plpgsql
as $$
  declare current_session_id uuid;
  begin
    select id into current_session_id from sessions 
    where session_date = (select max(session_date) from sessions);
    insert into player_sessions(session_id, player_id) values(current_session_id, player_id);
    update players set active = true where players.id = player_id;
  end;
$$;