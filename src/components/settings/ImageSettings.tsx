import '../../styles/settings.css';

// components
import SettingsCard from './SettingsCard';

// types
import { ImageSettings as ImageSettingsType } from '../../types/settings/ImageSettings';
import { SettingdCardData } from '../../types/settings/SettingsCardData';

import { useUser } from '../../context/UserContext';
import validateSettings from '../../utils/validateSettings';
import { AllSettings } from '../../types/settings/AllSettings';
import { formatImageSettingsForCards } from '../../utils/formatImageSettings';

// errors on page cannot be triggers by the user
// as onChange will not display until valid settings are fetched

export default function ImageSettings({
  allSettings,
}: {
  allSettings: AllSettings;
}) {
  const userContext = useUser();
  if (!userContext) return;
  const { user } = userContext;
  // TODO return error/ redirect
  if (!validateSettings(user.settings)) return;
  const imageSettings: ImageSettingsType = allSettings.imageSettings;

  const settings: SettingdCardData[] =
    formatImageSettingsForCards(imageSettings);

  return (
    <div className="settings">
      {settings.map((setting, i) => {
        return (
          <div key={i}>
            <SettingsCard
              index={i}
              setting={setting}
              imageSettings={imageSettings}
            />
          </div>
        );
      })}
    </div>
  );
}
