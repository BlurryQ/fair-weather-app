import '../styles/settings.css';
import SettingsCard from './SettingsCard';

export default function Settings() {
  // TODO work out where (component?) to get userdata from local storage

  return (
    <>
      {/* TODO create drop down component which accepts value and options */}

      <div className="settings">
        <SettingsCard />
        <SettingsCard />
        <SettingsCard />
      </div>
    </>
  );
}
