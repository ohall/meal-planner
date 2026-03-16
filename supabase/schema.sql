create table if not exists public.prompt_settings (
	household_id text primary key,
	positive_prompts text[] not null default '{}',
	avoid_prompts text[] not null default '{}',
	cuisines text[] not null default '{}',
	pantry_staples text[] not null default '{}',
	dietary_preferences text[] not null default '{}',
	max_prep_minutes integer not null default 30,
	servings integer not null default 4,
	notes text not null default '',
	updated_at timestamptz not null default now()
);

create table if not exists public.recipes (
	id text primary key,
	household_id text not null,
	name text not null,
	description text,
	ingredients jsonb not null default '[]'::jsonb,
	instructions text,
	prep_time integer,
	cook_time integer,
	servings integer,
	is_favorite boolean not null default false,
	is_disliked boolean not null default false,
	last_planned_at timestamptz,
	times_served integer not null default 0,
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

create table if not exists public.meal_assignments (
	id bigint generated always as identity primary key,
	household_id text not null,
	day_index integer not null,
	day_name text not null,
	recipe_id text not null,
	recipe_name text not null,
	source text not null check (source in ('saved', 'generated')),
	saved_at timestamptz not null default now(),
	unique (household_id, day_index)
);
