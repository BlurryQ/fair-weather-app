// models
import { updateCoreSettings } from '../models/supabase/tables/coreSettings';

// types
import { CoreSettings } from '../types/settings/CoreSettings';
import { ImageSettings } from '../types/settings/ImageSettings';

export default async function updateUser (
  location: string,
  settings: CoreSettings | ImageSettings,
  loadingData: React.Dispatch<React.SetStateAction<boolean>>,
  updateUserSettings: (settingType: string, userUpdates: CoreSettings | ImageSettings) => void
  ) {
    try {
      if (location === 'image') {
      await updateUserSettings(location, settings); // Update the user context with the new core settings
      // await updateImageSettings(settings); // Update the core settings in the database
      loadingData(false);
      return true;
    } else if (location === 'core') {
      await updateUserSettings(location, settings); // Update the user context with the new core settings
      await updateCoreSettings(settings); // Update the core settings in the database
      loadingData(false);
      return true;
    }
    } catch (error) {
      console.error('Error updating user settings:', error);
      loadingData(false);
      return false;
    }
  return false
}