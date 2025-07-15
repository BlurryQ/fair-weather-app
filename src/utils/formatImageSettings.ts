import {ImageSettings} from '../types/settings/ImageSettings';
import { SettingdCardData } from '../types/settings/SettingsCardData';

export const formatImageSettingsForCards = (imageSettings: ImageSettings): any[] => {
    const settings: string[] = Object.keys(imageSettings);
    const validSettings: string[] = settings.filter((setting) =>
      setting.includes('_on')
    );
    const validSettingsWithValues: SettingdCardData[] = validSettings.map(
      (setting) => {
        const name: string = setting.replace('_on', '');
        return {
          name,
          active: imageSettings[setting],
          value: imageSettings[name],
        };
      }
    );
    return validSettingsWithValues;
  };

  export const formatImageSettingsForDB = (key: SettingdCardData, imageSettings: ImageSettings): ImageSettings => {   
    imageSettings[key.name] = key.value;
    imageSettings[key.name + '_on'] = key.active;
    return imageSettings;
  };