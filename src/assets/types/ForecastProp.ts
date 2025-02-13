import { HourProp } from "./HourProp";
import { DisplayNavButtons } from "./DisplayNavButtons";

export type ForecastProp = {
  hour: HourProp;
  index: number;
  chosenHour: number;
  setChosenHour: React.Dispatch<React.SetStateAction<number>>;
  displayNavButton: DisplayNavButtons;
};
