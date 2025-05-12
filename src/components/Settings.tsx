import { useState } from 'react';
import { useUser } from '../context/UserContext';
import '../styles/settings.css';
import SettingsCard from './SettingsCard';

export default function Settings() {
  // TODO work out where (component?) to get userdata from local storage
  const [firstHour, setFirstHour] = useState<number>(9);
  const [lastHour, setLastHour] = useState<number>(22);
  const [isCelsius, setIsCelsius] = useState<boolean>(true);
  const [isMiles, setIsMiles] = useState<boolean>(true);

  const userContext = useUser();
  if (!userContext) return;
  const { user } = userContext;

  return (
    <>
      {/* TODO create drop down component which accepts value and options */}
      <div className="core-settings">
        <h1>{user.email}</h1>

        <label htmlFor="first-hour">First Hour:</label>
        <input
          id="first-hour"
          type="number"
          min={0}
          max={23}
          defaultValue={firstHour}
          onChange={(e) => setFirstHour(parseInt(e.target.value))}
        />

        <label htmlFor="last-hour">Last Hour:</label>
        <input
          id="last-hour"
          type="number"
          min={0}
          max={23}
          defaultValue={lastHour}
          onChange={(e) => setLastHour(parseInt(e.target.value))}
        />

        <label htmlFor="is-celsius">
          Temperature:
          <input
            className="switch"
            id="is-celsius"
            type="checkbox"
            onChange={() => setIsCelsius(!isCelsius)}
            checked={isCelsius}
          />
          <span className="slider"></span>
        </label>

        <label htmlFor="is-miles">
          Distance:
          <input
            className="switch"
            id="is-miles"
            type="checkbox"
            onChange={() => setIsMiles(!isMiles)}
            checked={isMiles}
          />
          <span className="slider"></span>
        </label>
      </div>

      <div className="settings">
        <SettingsCard />
        <SettingsCard />
        <SettingsCard />
      </div>
    </>
  );
}
