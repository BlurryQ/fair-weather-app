import { LimitProp } from "../types/LimitProp";
import { ImageSettings } from "../types/settings/ImageSettings";

export default function getValueLimits (settingName: string, imageSettings: ImageSettings) {
  // get value limits for opposite image settings received
    const isHigh: boolean = settingName.split('_').shift() === 'high';
    const oppositeSetting: string = isHigh
      ? settingName.replace('high', 'low')
      : settingName.replace('low', 'high');

    const limits: LimitProp = {
      name: oppositeSetting,
      type: 'any', // higher/ lower/ any
      value: 0,
    };
    if (settingName === oppositeSetting) return limits;

    limits.type = isHigh ? 'lower' : 'higher';
    limits.value = imageSettings[
      oppositeSetting as keyof ImageSettings
    ] as number;
    return limits;
  };