export default function getSettingDetail(settingName: string): string {
  // return setting detail string based on setting name
    switch (settingName) {
      case 'Hot':
        return 'for temperatures above';
      case 'Warm':
        return 'for temperatures up to';
      case 'Cold':
        return 'for temperatures below';
      case 'rain_chance':
      case 'snow_chance':
        return 'for chance above';
      case 'high_wind':
      case 'low_wind':
        return 'for wind speeds above';
      case 'high_uv':
        return 'for uv above';
      case 'low_visability':
        return 'for visability below';
      default:
        return '';
    }
  }