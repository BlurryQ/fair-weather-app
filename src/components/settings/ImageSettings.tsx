import { useEffect, useState } from 'react';
import '../../styles/settings.css';

// context
import { useUser } from '../../context/UserContext';

// components
import SettingsCard from '../SettingsCard';

// types
import { AllSettings } from '../../types/settings/AllSettings';

// errors on page cannot be triggers by the user
// as onChange will not display until valid settings are fetched

export default function ImageSettings({
  allSettings,
  setAllSettings,
}: {
  allSettings: AllSettings;
  setAllSettings: React.Dispatch<React.SetStateAction<AllSettings>>;
}) {
  const arr: any[] = Array.from({ length: 3 }).fill(1);

  return (
    <div className="settings">
      {arr.map((setting, i) => {
        return (
          <div key={i}>
            <SettingsCard index={i} />
          </div>
        );
      })}
    </div>
  );
}
