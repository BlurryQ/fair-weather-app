// components
import SaveButton from '../common/SaveButton';
import RadioGroup from '../common/RadioGroup';

// types
import { AllSettings } from '../../types/settings/AllSettings';
import { CoreSettings as CoreSettingsType } from '../../types/settings/CoreSettings';
import { HourErrors } from '../../types/settings/HourErrors';
import { useState } from 'react';

const NO_ERRORS: HourErrors = { firstHourError: '', lastHourError: '' };

export default function CoreSettings({
  allSettings,
}: {
  allSettings: AllSettings;
}) {
  const [error, setError] = useState<HourErrors>(NO_ERRORS);

  // All inputs below are uncontrolled; this object is mutated in place as the
  // user edits and read by SaveButton on save. It intentionally does not drive
  // rendering (only the hour-range error message does).
  const [coreSettings] = useState<CoreSettingsType>({
    ...allSettings.coreSettings,
  });

  // Both messages are recomputed from both current values on every hour edit,
  // so fixing one field also clears a stale error left on the other.
  const validateHours = (first: number, last: number): HourErrors => {
    let firstHourError = '';
    let lastHourError = '';

    if (first < 0 || first > 22)
      firstHourError = 'First hour can only be from 0 - 22';
    else if (first >= last)
      firstHourError = 'First hour must be less than the last hour';

    if (last < 1 || last > 23)
      lastHourError = 'Last hour can only be from 1 - 23';
    else if (last <= first)
      lastHourError = 'Last hour must be more than the first hour';

    return { firstHourError, lastHourError };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    switch (id) {
      case 'celsius':
      case 'fahrenheit':
        coreSettings.is_celsius = id === 'celsius';
        break;
      case 'miles':
      case 'kilometers':
        coreSettings.is_miles = id === 'miles';
        break;
      case 'first-hour':
        coreSettings.first_hour = Number(value);
        setError(validateHours(coreSettings.first_hour, coreSettings.last_hour));
        break;
      case 'last-hour':
        coreSettings.last_hour = Number(value);
        setError(validateHours(coreSettings.first_hour, coreSettings.last_hour));
        break;
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

      <RadioGroup
        legend="Temperature"
        name="temperature"
        onChange={handleChange}
        options={[
          {
            id: 'celsius',
            label: 'Celsius',
            checked: coreSettings.is_celsius === true,
          },
          {
            id: 'fahrenheit',
            label: 'Fahrenheit',
            checked: coreSettings.is_celsius === false,
          },
        ]}
      />

      <RadioGroup
        legend="Distance"
        name="distance"
        onChange={handleChange}
        options={[
          {
            id: 'miles',
            label: 'Miles',
            checked: coreSettings.is_miles === true,
          },
          {
            id: 'kilometers',
            label: 'Kilometers',
            checked: coreSettings.is_miles === false,
          },
        ]}
      />

      <SaveButton
        disabled={!!error.firstHourError || !!error.lastHourError}
        type="core"
        settings={coreSettings}
      />
    </div>
  );
}
