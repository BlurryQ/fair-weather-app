// models
import { updateCoreSettings } from '../models/appwrite/tables/coreSettings';
import { updateImageSettings } from '../models/appwrite/tables/imageSettings';
import {
  deleteImage,
  getImageUrl,
  uploadImage,
} from '../models/appwrite/storage/imageStorage';

// types
import { CoreSettings } from '../types/settings/CoreSettings';
import { ImageSettings } from '../types/settings/ImageSettings';

export default async function updateUser (
  settingType: string,
  settings: unknown,
  saveState: React.Dispatch<React.SetStateAction<string>>,
  updateUserSettings: (settingType: string, userUpdates: CoreSettings | ImageSettings | string[]) => void
  ) {
    // update user settings based on setting type
    try {
      if (settingType === 'image') {
        const imageSettings = settings as ImageSettings
        await updateImageSettings(imageSettings); // Update the image settings in the database
        await updateUserSettings(settingType, imageSettings); // Update the user context with the new core settings
        saveState("saved");
        return true;
    } else if (settingType === 'core') {
        const coreSettings = settings as CoreSettings
        await updateCoreSettings(coreSettings); // Update the core settings in the database
        await updateUserSettings(settingType, coreSettings); // Update the user context with the new core settings
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
        await updateUserSettings(settingType, settings as string[]); // Update the user context with the new core settings
    }
    } catch (error) {
      console.error('Error updating user settings:', error);
      saveState("error");
      return false;
    }
  return false
}