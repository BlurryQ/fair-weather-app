// models
import { updateCoreSettings } from '../models/supabase/tables/coreSettings';
import { updateImageSettings } from '../models/supabase/tables/imageSettings';
import {
  deleteImage,
  getImageUrl,
  uploadImage,
} from '../models/supabase/storage/imageStorage';

// types
import { CoreSettings } from '../types/settings/CoreSettings';
import { ImageSettings } from '../types/settings/ImageSettings';

export default async function updateUser (
  settingType: string,
  settings: any,
  saveState: React.Dispatch<React.SetStateAction<string>>,
  updateUserSettings: (settingType: string, userUpdates: CoreSettings | ImageSettings | string[]) => void
  ) {
    try {
      if (settingType === 'image') {
        settings = settings as ImageSettings
        await updateImageSettings(settings); // Update the image settings in the database
        await updateUserSettings(settingType, settings); // Update the user context with the new core settings
        saveState("saved");
        return true;
    } else if (settingType === 'core') {
        settings = settings as CoreSettings
        await updateCoreSettings(settings); // Update the core settings in the database
        await updateUserSettings(settingType, settings); // Update the user context with the new core settings
        saveState("saved");
        return true;
    } else if (settingType === 'file') {
        const [file, imageLocation] = settings as [File, string]
        await uploadImage(imageLocation, file as File)
        const imageName = imageLocation.split('/').pop() as string
        const imageUrl: string = await getImageUrl(imageLocation) as string
        await updateUserSettings(settingType, [imageName, imageUrl]); // Update the user context with the new core settings
    } else if (settingType === "deleteImage") {
        deleteImage(settings as string[]);
        await updateUserSettings(settingType, settings); // Update the user context with the new core settings
    }
    } catch (error) {
      console.error('Error updating user settings:', error);
      saveState("error");
      return false;
    }
  return false
}