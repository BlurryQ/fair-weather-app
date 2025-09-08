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
  // TODO move this if keeping
  type HourErrors = {
    firstHourError: string;
    lastHourError: string;
  };

  const [error, setError] = useState<HourErrors>({
    firstHourError: '',
    lastHourError: '',
  });
  // const coreSettings: CoreSettingsType = allSettings.coreSettings;
  const [coreSettings, setCoreSettings] = useState<CoreSettingsType>({
    ...allSettings.coreSettings,
  });

  // TODO refactor
  const handleChange = (e: any) => {
    const settingName: string = e.target.id;
    const value: number = e.target.value;
    console.log(value);
    const timeSetting: boolean =
      settingName === 'first-hour' || settingName === 'last-hour';
    const tempSetting: boolean =
      settingName === 'celsius' || settingName === 'fahrenheit';
    const distanceSetting: boolean =
      settingName === 'miles' || settingName === 'kilometers';
    // if tempSetting set metric
    if (tempSetting) {
      coreSettings.is_celsius = settingName === 'celsius';
      // else if distance set metric
    } else if (distanceSetting) {
      coreSettings.is_miles = settingName === 'miles';
      // else if first hour set settingName
    } else if (timeSetting) {
      let error: string = '';
      // if first hour
      console.log('first', coreSettings.first_hour);
      console.log('last', coreSettings.last_hour);
      if (settingName === 'first-hour') {
        coreSettings.first_hour = Number(e.target.value);
        console.log('first2', coreSettings.first_hour);
        // if hour too high error else
        // if (coreSettings.first_hour >= coreSettings.last_hour) {
        //   error = 'First hour must be less than the last hour';
        // }
        if (value < 0 || value > 22) {
          error = 'First hour can only be from 0 - 22';
        }
        return setError((prev) => ({
          ...prev,
          firstHourError: error,
        }));
        // eles if last hour
      } else if (settingName === 'last-hour') {
        coreSettings.last_hour = Number(e.target.value);
        console.log('last2', coreSettings.last_hour);
        if (coreSettings.last_hour <= coreSettings.first_hour) {
          error = 'Last hour must be more than the first hour';
        }
        if (value < 1 || value > 23) {
          error = 'Last hour can only be from 1 - 23';
        } else {
          error = '';
        }
        return setError((prev) => ({
          ...prev,
          lastHourError: error,
        }));
      }

      if (coreSettings.first_hour >= coreSettings.last_hour) {
        error = 'First hour must be less than the last hour';
        return setError((prev) => ({
          ...prev,
          firstHourError: error,
        }));
      } else {
        setError((prev) => ({
          ...prev,
          firstHourError: '',
        }));
      }
      setCoreSettings(coreSettings);
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
          max={22}
          defaultValue={coreSettings.first_hour}
          onChange={handleChange}
        />
      </div>

      <div className="group">
        <label htmlFor="last-hour">Last Hour:</label>
        <input
          id="last-hour"
          type="number"
          min={1}
          max={23}
          defaultValue={coreSettings.last_hour}
          onChange={handleChange}
        />
      </div>
      <p
        className={
          error.firstHourError || error.lastHourError ? 'error' : 'invisible'
        }
      >
        {error.firstHourError || error.lastHourError || 'error'}
      </p>

      {/* TODO make these radio buttons components? */}
      <legend>Temperature:</legend>
      <div className="setting-group">
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

      <legend>Distance:</legend>
      <div className="setting-group">
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

      <SaveButton
        disabled={!!error.firstHourError || !!error.lastHourError}
        type="core"
        settings={coreSettings}
      />
    </div>
  );
}
