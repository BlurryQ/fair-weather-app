// models
import { updateCoreSettings } from '../models/supabase/tables/coreSettings';

// types
import { CoreSettings } from '../types/settings/CoreSettings';
import { ImageSettings } from '../types/settings/ImageSettings';

export default async function updateUser (
  location: string,
  settings: CoreSettings | ImageSettings,
  saveState: React.Dispatch<React.SetStateAction<string>>,
  updateUserSettings: (settingType: string, userUpdates: CoreSettings | ImageSettings) => void
  ) {
    try {
      if (location === 'image') {
        // TODO: Update image settings in the database
      await updateUserSettings(location, settings); // Update the user context with the new core settings
      // await updateImageSettings(settings); // Update the core settings in the database
      saveState("saved");
      return true;
    } else if (location === 'core') {
      const coreSettings = await updateCoreSettings(settings); // Update the core settings in the database
      if (!coreSettings) {
        throw new Error("Failed to update core settings in the database");
      }
      await updateUserSettings(location, settings); // Update the user context with the new core settings
      saveState("saved");
      return true;
    }
    } catch (error) {
      console.error('Error updating user settings:', error);
      saveState("error");
      return false;
    }
  return false
}