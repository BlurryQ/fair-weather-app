import '../styles/settings.css';
import SettingsCard from './SettingsCard';

export default function Settings() {
  // TODO work out where (component?) to get userdata from local storage

  return (
    <div className="settings">
      <SettingsCard />
      <SettingsCard />
      <SettingsCard />
    </div>
  );
}
