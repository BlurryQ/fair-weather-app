import {
  account,
  databases,
  DATABASE_ID,
  IMAGE_SETTINGS_COLLECTION_ID,
} from '../client';

const IMAGE_KEYS = [
  'good_day_on',
  'high_temp',
  'high_temp_on',
  'high_uv',
  'high_uv_on',
  'high_wind',
  'high_wind_on',
  'low_temp',
  'low_temp_on',
  'low_visability',
  'low_visability_on',
  'low_wind',
  'low_wind_on',
  'rain_chance',
  'rain_chance_on',
  'snow_chance',
  'snow_chance_on',
] as const;

// Strip Appwrite system fields ($id, $createdAt, ...) and anything else the
// collection does not define, so updateDocument does not reject the payload.
function pickAttributes(settings: any) {
  const data: Record<string, unknown> = {};
  for (const key of IMAGE_KEYS) {
    if (settings?.[key] !== undefined) data[key] = settings[key];
  }
  return data;
}

export async function getImageSettings(): Promise<any> {
  try {
    const user = await account.get();
    const doc = await databases.getDocument(
      DATABASE_ID,
      IMAGE_SETTINGS_COLLECTION_ID,
      user.$id
    );
    return { ...doc, id: doc.$id };
  } catch (err: any) {
    console.error(err.message);
  }
}

export async function updateImageSettings(settings: any) {
  try {
    const user = await account.get();
    const doc = await databases.updateDocument(
      DATABASE_ID,
      IMAGE_SETTINGS_COLLECTION_ID,
      user.$id,
      pickAttributes(settings)
    );
    return [{ ...doc, id: doc.$id }];
  } catch (err: any) {
    console.error(err.message);
  }
}
