import "../../styles/dateSelector.css";
import { DateSelectorProp } from "../types/DateSelectorProp";

export default function DateSelector({
  top,
  dateSelectorProp,
}: {
  top: boolean;
  dateSelectorProp: DateSelectorProp;
}): JSX.Element {
  //   ms in one dayt
  const oneDay: number = 1000 * 60 * 60 * 24;

  const {
    chosenIndex,
    setChosenIndex,
    dateEpoch,
    setDateEpoch,
    dateString,
    setDateString,
  } = dateSelectorProp;

  const previousDate = () => {
    const previousDay: number = dateEpoch - oneDay;
    setChosenIndex(chosenIndex - 1);
    setDateEpoch(previousDay);
    setDateString(new Date(previousDay).toDateString());

    const topSelector = document.getElementById("top-date-selector");
    if (topSelector) {
      topSelector.scrollIntoView({ behavior: "smooth" }); // Smooth scroll
    }
  };

  const nextDate = () => {
    const nextDay: number = dateEpoch + oneDay;
    setChosenIndex(chosenIndex + 1);
    setDateEpoch(nextDay);
    setDateString(new Date(nextDay).toDateString());

    const topSelector = document.getElementById("top-date-selector");
    if (topSelector) {
      topSelector.scrollIntoView({ behavior: "smooth" }); // Smooth scroll
    }
  };

  return (
    <div id={top ? "top-date-selector" : ""} className="date-selector">
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
