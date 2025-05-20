create or replace function create_season()
returns
  void
  language plpgsql
as $$
  begin
    insert into seasons(active) values(true);
  end;
$$;