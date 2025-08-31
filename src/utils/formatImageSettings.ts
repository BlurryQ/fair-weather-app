import {ImageSettings} from '../types/settings/ImageSettings';
import { BooleanSettingKeys, NumericSettingKeys, SettingdCardData } from '../types/settings/SettingsCardData';

export const formatImageSettingsForCards = (imageSettings: ImageSettings): SettingdCardData[] => {
    const settings: string[] = Object.keys(imageSettings);
    const validSettings: string[] = settings.filter((setting) =>
      setting.includes('_on')
    );
    const validSettingsWithValues: SettingdCardData[] = validSettings.map(
      (setting) => {
        const name: string = setting.replace('_on', '');
        return {
          name,
          active: imageSettings[setting as keyof ImageSettings] as boolean,
          value: imageSettings[name as keyof ImageSettings] as number,
        };
      }
    );
    return validSettingsWithValues;
  };

  export const formatImageSettingsForDB = (key: SettingdCardData, imageSettings: ImageSettings): ImageSettings => {   
    imageSettings[key.name as NumericSettingKeys] = key.value;
    imageSettings[key.name + '_on' as BooleanSettingKeys] = key.active; 
    return imageSettings;
  };