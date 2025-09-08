// models
import { getCoreSettings } from './coreSettings';
import { getImageSettings } from './imageSettings';

// types
import { AllSettings } from '../../../types/settings/AllSettings';
import { CoreSettings } from '../../../types/settings/CoreSettings';
import { ImageSettings } from '../../../types/settings/ImageSettings';
import { getAllImageUrls } from '../storage/imageStorage';
import { ImageUrls } from '../../../types/settings/ImageUrls';

export default async function getAllSettings(): Promise<AllSettings> {
  const coreSettings: CoreSettings = await getCoreSettings();
  const imageSettings: ImageSettings = await getImageSettings();
  const imageUrls: ImageUrls[] | undefined = await getAllImageUrls(imageSettings.id);
  const allSettings: AllSettings = {
    coreSettings,
    imageSettings,
    imageUrls: imageUrls || [],
    timestamp: new Date().getTime(), // Set current timestamp
  };
  return (allSettings);
};