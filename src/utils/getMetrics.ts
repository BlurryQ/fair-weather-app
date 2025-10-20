import { CoreSettings } from "../types/settings/CoreSettings";

export default function getMetrics(settingName: string): string {
  // return metric string based on setting name and core settings
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const coreSettings: CoreSettings = user.settings.coreSettings

        switch (settingName) {
      case 'Hot':
      case 'Warm':
      case 'Cold':
        return coreSettings.is_celsius ? "°C" : "°F"
      case 'rain_chance':
      case 'snow_chance':
        return '%';
      case 'high_wind':
      case 'low_wind':
          case 'low_visability':
        return coreSettings.is_miles ? "miles" : "kilometres"
      case 'high_uv':
        return 'index';
      default:
        return '';
    }


}