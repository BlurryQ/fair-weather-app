import { Models } from 'appwrite';
import {
  account,
  databases,
  DATABASE_ID,
  CORE_SETTINGS_COLLECTION_ID,
} from '../client';
import { CoreSettings } from '../../../types/settings/CoreSettings';
import getErrorMessage from '../../../utils/getErrorMessage';

const CORE_KEYS = ['first_hour', 'last_hour', 'is_celsius', 'is_miles'] as const;

type CoreSettingsDoc = Models.Document & CoreSettings;

// Strip Appwrite system fields ($id, $createdAt, ...) and anything else the
// collection does not define, so updateDocument does not reject the payload.
function pickAttributes(settings: Partial<CoreSettings>) {
  const data: Record<string, unknown> = {};
  for (const key of CORE_KEYS) {
    if (settings?.[key] !== undefined) data[key] = settings[key];
  }
  return data;
}

export async function getCoreSettings(): Promise<CoreSettings | undefined> {
  try {
    const user = await account.get();
    const doc = await databases.getDocument<CoreSettingsDoc>(
      DATABASE_ID,
      CORE_SETTINGS_COLLECTION_ID,
      user.$id
    );
    return { ...doc, id: doc.$id };
  } catch (err) {
    console.error(getErrorMessage(err));
  }
}

export async function updateCoreSettings(settings: Partial<CoreSettings>) {
  try {
    const user = await account.get();
    const doc = await databases.updateDocument<CoreSettingsDoc>(
      DATABASE_ID,
      CORE_SETTINGS_COLLECTION_ID,
      user.$id,
      pickAttributes(settings)
    );
    return [{ ...doc, id: doc.$id }];
  } catch (err) {
    console.error(getErrorMessage(err));
  }
}
