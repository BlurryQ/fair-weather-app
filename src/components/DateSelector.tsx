import '../styles/dateSelector.css';
import { format } from 'date-fns';

// props
import { DateSelectorProp } from '../types/DateSelectorProp';

export default function DateSelector({
  top,
  dateSelectorProp,
}: {
  top: boolean;
  dateSelectorProp: DateSelectorProp;
}): JSX.Element {
  //   ms in one dayt
  const oneDay: number = 1000 * 60 * 60 * 24;

  const { chosenDay, setChosenDay, setChosenHour, dateEpoch, setDateEpoch } =
    dateSelectorProp;

  const previousDate = (): void => {
    const topSelector = document.getElementById('top-date-selector');
    const previousDay: number = dateEpoch - oneDay;
    setChosenHour(1);
    setChosenDay(chosenDay - 1);
    setDateEpoch(previousDay);

    // if top selector exists and bottom selector clicked
    if (topSelector && !top) {
      topSelector.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nextDate = (): void => {
    const topSelector = document.getElementById('top-date-selector');
    const nextDay: number = dateEpoch + oneDay;
    setChosenHour(1);
    setChosenDay(chosenDay + 1);
    setDateEpoch(nextDay);

    // if top selector exists and bottom selector clicked
    if (topSelector && !top) {
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
      {format(dateEpoch, 'EEE MMM do')}
      <button
        onClick={nextDate}
        className={`date-scroll ${chosenDay === 2 ? 'hidden' : null}`}
      >
        &gt;
      </button>
    </div>
  );
}
