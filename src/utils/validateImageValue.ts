import { LimitProp } from "../types/LimitProp";
import { ImageSettings } from "../types/settings/ImageSettings";
import getValueLimits from "./getValueLimits";

  export default function validateImageValue (
    settingName: string,
    currentValue:number,
  ): string {
    // check image settings and send opposite value limits
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const imageSettings: ImageSettings = user.settings.imageSettings;

        const oppositeValue: LimitProp = getValueLimits(
          settingName,
          imageSettings
        );
        if (oppositeValue.type === 'higher') {
          if (currentValue >= oppositeValue.value) {
            return ('Must be lower than ' + oppositeValue.value);
          } 
        } else if (oppositeValue.type === 'lower') {
          if (currentValue <= oppositeValue.value) {
            return ('Must be higher than ' + oppositeValue.value);
          } 
        }
        return('');
      };