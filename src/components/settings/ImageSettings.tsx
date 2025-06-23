import '../../styles/settings.css';

// components
import SettingsCard from '../SettingsCard';

// types
import { AllSettings } from '../../types/settings/AllSettings';
import { ImageSettings as ImageSettingsType } from '../../types/settings/ImageSettings';
import { SettingdCardData } from '../../types/settings/SettingsCardData';

// errors on page cannot be triggers by the user
// as onChange will not display until valid settings are fetched

export default function ImageSettings({
  allSettings,
  setAllSettings,
}: {
  allSettings: AllSettings;
  setAllSettings: React.Dispatch<React.SetStateAction<AllSettings>>;
}) {
  const imageSettings: ImageSettingsType = allSettings.imageSettings;

  const getSettingsArray = (imageSettings: ImageSettingsType): any[] => {
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

    // console.log(validSettingsWithValues);
    return validSettingsWithValues;
  };

  const settings: SettingdCardData[] = getSettingsArray(imageSettings);

  return (
    <div className="settings">
      {settings.map((setting, i) => {
        return (
          <div key={i}>
            <SettingsCard index={i} setting={setting} />
          </div>
        );
      })}
    </div>
  );
}
