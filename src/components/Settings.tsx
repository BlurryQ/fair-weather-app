import { useState } from 'react';
import { useUser } from '../context/UserContext';
import '../styles/settings.css';
import SettingsCard from './SettingsCard';
import Toggle from './Toggle';

export default function Settings() {
  const [firstHour, setFirstHour] = useState<number>(9);
  const [lastHour, setLastHour] = useState<number>(22);
  const [isCelsius, setIsCelsius] = useState<boolean>(true);
  const [isMiles, setIsMiles] = useState<boolean>(true);

  const userContext = useUser();
  if (!userContext) return;
  const { user } = userContext;

  const arr: any[] = Array.from({ length: 3 }).fill(1);

  // TODO: When tabbed settings and images have 1 save button for settings and multiple for images
  // TODO: Error handling for hours

  return (
    <form>
      {/* TODO create drop down component which accepts value and options */}
      <div className="core-settings">
        {/* <h1>{user.email}</h1> */}

        <div className="group">
          <label htmlFor="first-hour">First Hour:</label>
          <input
            id="first-hour"
            type="number"
            min={0}
            max={23}
            defaultValue={firstHour}
            onChange={(e) => setFirstHour(parseInt(e.target.value))}
          />
        </div>

        <div className="group">
          <label htmlFor="last-hour">Last Hour:</label>
          <input
            id="last-hour"
            type="number"
            min={0}
            max={23}
            defaultValue={lastHour}
            onChange={(e) => setLastHour(parseInt(e.target.value))}
          />
        </div>

        <div className="setting-group">
          <legend>Temperature:</legend>
          <label htmlFor="is-celsius">Celsius:</label>
          <input
            className="radio"
            id="is-celsius"
            name="is-celsius"
            type="radio"
            defaultChecked
          />
          <label htmlFor="is-celsius">Fahrenheit:</label>
          <input
            className="radio"
            id="is-celsius"
            name="is-celsius"
            type="radio"
          />
        </div>

        <div className="setting-group">
          <legend>Distance:</legend>
          <label htmlFor="is-miles">Miles:</label>
          <input
            className="radio"
            id="is-miles"
            name="is-miles"
            type="radio"
            defaultChecked
          />
          <label htmlFor="is-miles">Kilometers:</label>
          <input className="radio" id="is-miles" name="is-miles" type="radio" />
        </div>

        <button className="save">Save</button>
      </div>

      <div className="settings">
        {arr.map((setting, i) => {
          return (
            <div key={i}>
              <SettingsCard index={i} />
            </div>
          );
        })}
      </div>
    </form>
  );
}
