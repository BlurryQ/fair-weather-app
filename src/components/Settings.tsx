import { useUser } from '../context/UserContext';
import '../styles/settings.css';
import SettingsCard from './SettingsCard';

export default function Settings() {
  // TODO work out where (component?) to get userdata from local storage

  const userContext = useUser();
  if (!userContext) return;
  const { user } = userContext;

  return (
    <>
      {/* TODO create drop down component which accepts value and options */}
      <h1>{user.email}</h1>
      <div className="settings">
        <SettingsCard />
        <SettingsCard />
        <SettingsCard />
      </div>
    </>
  );
}
