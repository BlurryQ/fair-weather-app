import { useState } from "react";
import "../../styles/dateSelector.css";

export default function DateSelector({
  chosenIndex,
  setChosenIndex,
}: {
  chosenIndex: number;
  setChosenIndex: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element {
  const [dateString, setDateString] = useState<string>(
    new Date().toDateString()
  );
  const [dateEpoch, setDateEpoch] = useState<number>(Date.now());
  //   ms in one dayt
  const oneDay: number = 1000 * 60 * 60 * 24;

  const previousDate = () => {
    const previousDay: number = dateEpoch - oneDay;
    setChosenIndex(chosenIndex - 1);
    setDateEpoch(previousDay);
    setDateString(new Date(previousDay).toDateString());
  };

  const nextDate = () => {
    const nextDay: number = dateEpoch + oneDay;
    setChosenIndex(chosenIndex + 1);
    setDateEpoch(nextDay);
    setDateString(new Date(nextDay).toDateString());
  };

  return (
    <div className="date-selector">
      <span onClick={previousDate} className="date-scroll">
        &lt;
      </span>
      {dateString}
      <span onClick={nextDate} className="date-scroll">
        &gt;
      </span>
    </div>
  );
}
