import {ImageSettings} from '../types/settings/ImageSettings';
import { BooleanSettingKeys, NumericSettingKeys, SettingdCardData } from '../types/settings/SettingsCardData';

// The card order used to come "for free" from the Supabase column order. Appwrite
// returns document attributes in its own order, so pin the sequence here instead
// of trusting Object.keys(). Anything not listed falls to the end in key order.
const CARD_ORDER: string[] = [
  'good_day',
  'high_temp',
  'high_uv',
  'high_wind',
  'low_temp',
  'low_visability',
  'low_wind',
  'rain_chance',
  'snow_chance',
];

export const formatImageSettingsForCards = (imageSettings: ImageSettings): SettingdCardData[] => {
  // format image settings for settings cards
    const settings: string[] = Object.keys(imageSettings);
    const validSettings: string[] = settings
      .filter((setting) => setting.includes('_on'))
      .sort((a, b) => {
        const rank = (key: string) => {
          const i = CARD_ORDER.indexOf(key.replace('_on', ''));
          return i === -1 ? CARD_ORDER.length : i;
        };
        return rank(a) - rank(b);
      });
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
    // inverse function to format image settings for database
    imageSettings[key.name as NumericSettingKeys] = key.value;
    imageSettings[key.name + '_on' as BooleanSettingKeys] = key.active; 
    return imageSettings;
  };