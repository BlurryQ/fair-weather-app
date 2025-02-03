import '../styles/forecast.css';

import { DisplayNavButtons } from '../types/DisplayNavButtons';

export default function NavButtons({
  chosenHour,
  setChosenHour,
  displayNavButton,
}: {
  chosenHour: number;
  setChosenHour: React.Dispatch<React.SetStateAction<number>>;
  displayNavButton: DisplayNavButtons;
}): JSX.Element {
  const handleChange = (direct: string) => {
    if (direct === 'left') {
      setChosenHour(chosenHour - 1);
    } else {
      setChosenHour(chosenHour + 1);
    }
  };

  return (
    <>
      {displayNavButton.left ? (
        <button className="move-left" onClick={() => handleChange('left')}>
          &lt;
        </button>
      ) : null}

      {displayNavButton.right ? (
        <button className="move-right" onClick={() => handleChange('right')}>
          &gt;
        </button>
      ) : null}
    </>
  );
}
