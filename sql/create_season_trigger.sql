create or replace function create_season_trigger()
returns 
  trigger 
  language plpgsql 
as $$
begin
  update seasons set active = false where active = true;
  update players set active = false;
  return new;
end;
$$;


create trigger create_season_trigger
before insert on seasons execute function new_season()