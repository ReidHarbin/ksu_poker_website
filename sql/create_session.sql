create or replace function create_session()
  returns void
  language plpgsql
as $$
  declare
    active_season_id uuid;
  begin
    select id into active_season_id from seasons 
    where active = true;
    
    insert into sessions(season_id) values(active_season_id);
  end;
$$;