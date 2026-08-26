import { Permission, Role } from 'appwrite';
import {
  databases,
  DATABASE_ID,
  CORE_SETTINGS_COLLECTION_ID,
  IMAGE_SETTINGS_COLLECTION_ID,
} from '../client';

// Supabase created these rows via a DB trigger on new auth users. Appwrite has
// no equivalent on the client path, so new sign ups provision their own
// defaults right after the session is created.
const DEFAULT_CORE_SETTINGS = {
  first_hour: 6,
  last_hour: 22,
  is_celsius: true,
  is_miles: true,
};

const DEFAULT_IMAGE_SETTINGS = {
  good_day_on: true,
  high_temp: 17,
  high_temp_on: true,
  high_uv: 3,
  high_uv_on: true,
  high_wind: 35,
  high_wind_on: true,
  low_temp: 5,
  low_temp_on: true,
  low_visability: 2,
  low_visability_on: true,
  low_wind: 20,
  low_wind_on: true,
  rain_chance: 60,
  rain_chance_on: true,
  snow_chance: 60,
  snow_chance_on: true,
};

export default async function provisionUserSettings(
  userId: string
): Promise<void> {
  const perms = [
    Permission.read(Role.user(userId)),
    Permission.update(Role.user(userId)),
    Permission.delete(Role.user(userId)),
  ];

  await databases.createDocument(
    DATABASE_ID,
    CORE_SETTINGS_COLLECTION_ID,
    userId,
    DEFAULT_CORE_SETTINGS,
    perms
  );
  await databases.createDocument(
    DATABASE_ID,
    IMAGE_SETTINGS_COLLECTION_ID,
    userId,
    DEFAULT_IMAGE_SETTINGS,
    perms
  );
}
