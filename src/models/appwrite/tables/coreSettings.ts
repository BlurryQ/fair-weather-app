import {
  account,
  databases,
  DATABASE_ID,
  CORE_SETTINGS_COLLECTION_ID,
} from '../client';

const CORE_KEYS = ['first_hour', 'last_hour', 'is_celsius', 'is_miles'] as const;

// Strip Appwrite system fields ($id, $createdAt, ...) and anything else the
// collection does not define, so updateDocument does not reject the payload.
function pickAttributes(settings: any) {
  const data: Record<string, unknown> = {};
  for (const key of CORE_KEYS) {
    if (settings?.[key] !== undefined) data[key] = settings[key];
  }
  return data;
}

export async function getCoreSettings(): Promise<any> {
  try {
    const user = await account.get();
    const doc = await databases.getDocument(
      DATABASE_ID,
      CORE_SETTINGS_COLLECTION_ID,
      user.$id
    );
    return { ...doc, id: doc.$id };
  } catch (err: any) {
    console.error(err.message);
  }
}

export async function updateCoreSettings(settings: any) {
  try {
    const user = await account.get();
    const doc = await databases.updateDocument(
      DATABASE_ID,
      CORE_SETTINGS_COLLECTION_ID,
      user.$id,
      pickAttributes(settings)
    );
    return [{ ...doc, id: doc.$id }];
  } catch (err: any) {
    console.error(err.message);
  }
}
