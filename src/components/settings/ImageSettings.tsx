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

export default function ImageSettings({
  allSettings,
}: {
  allSettings: AllSettings;
}) {
  const userContext = useUser();
  if (!userContext) return;
  const { user } = userContext;
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
              // TODO uncomment below: part of the toggle series
              // index={i}
              setting={setting}
              imageSettings={imageSettings}
            />
          </div>
        );
      })}
    </div>
  );
}
