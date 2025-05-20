create or replace function update_chip_delta(player_id, chips)
returns
  void
  language plpgsql
as $$
  declare current_session_id uuid;
  begin
    update player_sessions set chip_delta = chip_delta + chips where player_sessions.player_id = player_id;
  end;
$$;