import { ImageSettings } from "./ImageSettings"

export type NumericSettingKeys = {
  [key in keyof ImageSettings]: ImageSettings[key] extends number ? key : never
}[keyof ImageSettings];

export type BooleanSettingKeys = {
    [key in keyof ImageSettings]: ImageSettings[key] extends boolean ? key : never
}[keyof ImageSettings];

export type SettingdCardData = {
  name: string;
  active: boolean;
  value: number;
};