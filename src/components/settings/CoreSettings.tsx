// components
import SaveButton from '../general/SaveButton';

// types
import { AllSettings } from '../../types/settings/AllSettings';
import { CoreSettings as CoreSettingsType } from '../../types/settings/CoreSettings';
import { useState } from 'react';

export default function CoreSettings({
  allSettings,
}: {
  allSettings: AllSettings;
}) {
  // TODO: Error handling for hours
  const [error, setError] = useState<string>('');
  // TODO return error/ redirect
  const coreSettings: CoreSettingsType = allSettings.coreSettings;

  const handleChange = (e: any) => {
    const tempSettings: boolean =
      e.target.id === 'celsius' || e.target.id === 'fahrenheit';
    const distanceSettings: boolean =
      e.target.id === 'miles' || e.target.id === 'kilometers';
    if (tempSettings) {
      coreSettings.is_celsius = e.target.id === 'celsius';
    } else if (distanceSettings) {
      coreSettings.is_miles = e.target.id === 'miles';
    } else if (e.target.id === 'first-hour') {
      coreSettings.first_hour = Number(e.target.value);
      if (coreSettings.first_hour >= coreSettings.last_hour) {
        setError('First hour must be less than the last hour');
      } else {
        setError('');
      }
    } else if (e.target.id === 'last-hour') {
      coreSettings.last_hour = Number(e.target.value);
      if (coreSettings.last_hour <= coreSettings.first_hour) {
        setError('Last hour must be more than the last hour');
      } else {
        setError('');
      }
    }
  };

  return (
    <div className="core-settings">
      <div className="group">
        <label htmlFor="first-hour">First Hour:</label>
        <input
          id="first-hour"
          type="number"
          min={0}
          max={23}
          defaultValue={coreSettings.first_hour}
          onChange={handleChange}
        />
      </div>

      <div className="group">
        <label htmlFor="last-hour">Last Hour:</label>
        <input
          id="last-hour"
          type="number"
          min={0}
          max={23}
          defaultValue={coreSettings.last_hour}
          onChange={handleChange}
        />
      </div>
      <p className={error ? 'error' : 'invisible'}>{error || 'placeholder'}</p>

      {/* TODO make these radio buttons components? */}
      <div className="setting-group">
        <legend>Temperature:</legend>
        <label htmlFor="celsius">Celsius:</label>
        <input
          className="radio"
          id="celsius"
          name="temperature"
          type="radio"
          defaultChecked={coreSettings.is_celsius === true}
          onChange={handleChange}
        />
        <label htmlFor="fahrenheit">Fahrenheit:</label>
        <input
          className="radio"
          id="fahrenheit"
          name="temperature"
          type="radio"
          defaultChecked={coreSettings.is_celsius === false}
          onChange={handleChange}
        />
      </div>

      <div className="setting-group">
        <legend>Distance:</legend>
        <label htmlFor="miles">Miles:</label>
        <input
          className="radio"
          id="miles"
          name="distance"
          type="radio"
          defaultChecked={coreSettings.is_miles === true}
          onChange={handleChange}
        />
        <label htmlFor="kilometers">Kilometers:</label>
        <input
          className="radio"
          id="kilometers"
          name="distance"
          type="radio"
          defaultChecked={coreSettings.is_miles === false}
          onChange={handleChange}
        />
      </div>

      <SaveButton disabled={!!error} type="core" settings={coreSettings} />
    </div>
  );
}
