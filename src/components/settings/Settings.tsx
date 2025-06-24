import { useEffect, useState } from 'react';
import '../../styles/settings.css';

// components
import CoreSettings from './CoreSettings';
import ImageSettings from './ImageSettings';

// context
import { useUser } from '../../context/UserContext';

// types
import { AllSettings } from '../../types/settings/AllSettings';

// utils
import validateSettings from '../../utils/validateSettings';

export default function Settings() {
  const userContext = useUser();
  if (!userContext) return;
  const { user } = userContext;
  const [allSettings, setAllSettings] = useState<AllSettings | any>(
    user.settings
  );
  const [displaySettingsPage, setDisplaySettingsPage] =
    useState<string>('images');

  useEffect(() => {
    if (user && validateSettings(user.settings)) {
      setAllSettings(user.settings);
    }
  }, [user, allSettings]);

  const changeSettingsPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const value = e.currentTarget.value;
    if (value === 'images') {
      setDisplaySettingsPage('images');
    } else {
      setDisplaySettingsPage('core');
    }
  };

  if (!validateSettings(allSettings)) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <form>
      <>
        <div className="settings-menu">
          <button
            type="button"
            value="images"
            className={`cloud-text ${
              displaySettingsPage === 'images' ? 'selected' : ''
            }`}
            onClick={changeSettingsPage}
          >
            Images
          </button>
          <button
            type="button"
            value="core"
            className={`cloud-text ${
              displaySettingsPage === 'core' ? 'selected' : ''
            }`}
            onClick={changeSettingsPage}
          >
            Core
          </button>
        </div>

        {displaySettingsPage === 'images' ? (
          <ImageSettings
            allSettings={allSettings}
            setAllSettings={setAllSettings}
          />
        ) : (
          <CoreSettings
            allSettings={allSettings}
            setAllSettings={setAllSettings}
          />
        )}
      </>
    </form>
  );
}
