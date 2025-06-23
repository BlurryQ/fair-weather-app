// types
import { AllSettings } from '../../types/settings/AllSettings';

export default function CoreSettings({
  allSettings,
  setAllSettings,
}: {
  allSettings: AllSettings;
  setAllSettings: React.Dispatch<React.SetStateAction<AllSettings>>;
}) {
  // TODO: Error handling for hours

  const handleChange = (e: any) => {
    const tempSettings: boolean =
      e.target.id === 'celsius' || e.target.id === 'fahrenheit';
    const distanceSettings: boolean =
      e.target.id === 'miles' || e.target.id === 'kilometers';
    if (tempSettings) {
      allSettings.coreSettings.is_celsius = e.target.id === 'celsius';
    } else if (distanceSettings) {
      allSettings.coreSettings.is_miles = e.target.id === 'miles';
    } else if (e.target.id === 'first-hour') {
      allSettings.coreSettings.first_hour = Number(e.target.value);
    } else if (e.target.id === 'last-hour') {
      allSettings.coreSettings.last_hour = Number(e.target.value);
    }
    setAllSettings(allSettings);
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
          defaultValue={allSettings.coreSettings.first_hour}
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
          defaultValue={allSettings.coreSettings.last_hour}
          onChange={handleChange}
        />
      </div>

      {/* TODO make these radio buttons components? */}
      <div className="setting-group">
        <legend>Temperature:</legend>
        <label htmlFor="celsius">Celsius:</label>
        <input
          className="radio"
          id="celsius"
          name="temperature"
          type="radio"
          defaultChecked={allSettings.coreSettings.is_celsius === true}
          onChange={handleChange}
        />
        <label htmlFor="fahrenheit">Fahrenheit:</label>
        <input
          className="radio"
          id="fahrenheit"
          name="temperature"
          type="radio"
          defaultChecked={allSettings.coreSettings.is_celsius === false}
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
          defaultChecked={allSettings.coreSettings.is_miles === true}
          onChange={handleChange}
        />
        <label htmlFor="kilometers">Kilometers:</label>
        <input
          className="radio"
          id="kilometers"
          name="distance"
          type="radio"
          defaultChecked={allSettings.coreSettings.is_miles === false}
          onChange={handleChange}
        />
      </div>

      <button className="save">Save</button>
    </div>
  );
}
