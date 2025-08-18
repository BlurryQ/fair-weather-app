CREATE TABLE image_settings (
    id UUID PRIMARY KEY,
    high_temp INTEGER NOT NULL DEFAULT 17,
    high_temp_on INTEGER NOT NULL DEFAULT TRUE,
    low_temp INTEGER NOT NULL DEFAULT 5,
    low_temp_on INTEGER NOT NULL DEFAULT TRUE,
    rain_chance INTEGER NOT NULL DEFAULT 60,
    rain_chance_on INTEGER NOT NULL DEFAULT TRUE,
    snow_chance INTEGER NOT NULL DEFAULT 60,
    snow_chance_on INTEGER NOT NULL DEFAULT TRUE,
    high_wind INTEGER NOT NULL DEFAULT 35,
    high_wind_on INTEGER NOT NULL DEFAULT TRUE,
    low_wind INTEGER NOT NULL DEFAULT 20,
    low_wind_on INTEGER NOT NULL DEFAULT TRUE,
    high_uv INTEGER NOT NULL DEFAULT 3,
    high_uv_on INTEGER NOT NULL DEFAULT TRUE,
    low_visibility INTEGER NOT NULL DEFAULT 2,
    low_visibility_on INTEGER NOT NULL DEFAULT TRUE,
    good_day_on BOOLEAN
);

-- id needs to be uuid