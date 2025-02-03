import '../styles/dateSelector.css';
import { DateSelectorProp } from '../types/DateSelectorProp';

export default function DateSelector({
  top,
  dateSelectorProp,
}: {
  top: boolean;
  dateSelectorProp: DateSelectorProp;
}): JSX.Element {
  const topSelector = document.getElementById('top-date-selector');
  //   ms in one dayt
  const oneDay: number = 1000 * 60 * 60 * 24;

  const {
    chosenDay,
    setChosenDay,
    dateEpoch,
    setDateEpoch,
    dateString,
    setDateString,
    setChosenHour,
  } = dateSelectorProp;

  const previousDate = () => {
    const previousDay: number = dateEpoch - oneDay;
    setChosenHour(1);
    setChosenDay(chosenDay - 1);
    setDateEpoch(previousDay);
    setDateString(new Date(previousDay).toDateString());

    if (topSelector) {
      topSelector.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nextDate = () => {
    const nextDay: number = dateEpoch + oneDay;
    setChosenHour(1);
    setChosenDay(chosenDay + 1);
    setDateEpoch(nextDay);
    setDateString(new Date(nextDay).toDateString());

    if (topSelector) {
      topSelector.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id={top ? 'top-date-selector' : ''} className="date-selector">
      <button
        onClick={previousDate}
        className={`date-scroll ${chosenDay === 0 ? 'hidden' : null}`}
      >
        &lt;
      </button>
      {dateString}
      <button
        onClick={nextDate}
        className={`date-scroll ${chosenDay === 2 ? 'hidden' : null}`}
      >
        &gt;
      </button>
    </div>
  );
}
