CREATE TABLE core_settings (
    id SERIAL PRIMARY KEY, 
    first_hour INTEGER NOT NULL DEFAULT 6,
    last_hour INTEGER NOT NULL DEFAULT 22,
    is_celcius BOOLEAN NOT NULL DEFAULT TRUE,
    is_miles BOOLEAN NOT NULL DEFAULT TRUE
);

-- id needs to be uuid