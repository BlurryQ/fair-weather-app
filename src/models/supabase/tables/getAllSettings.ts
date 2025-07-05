// models
import { getCoreSettings } from './coreSettings';
import { getImageSettings } from './imageSettings';

// types
import { AllSettings } from '../../../types/settings/AllSettings';
import { CoreSettings } from '../../../types/settings/CoreSettings';
import { ImageSettings } from '../../../types/settings/ImageSettings';

export default async function getAllSettings(): Promise<AllSettings> {
  const coreSettings: CoreSettings = await getCoreSettings();
  const imageSettings: ImageSettings = await getImageSettings();
  return ({ coreSettings, imageSettings });
};