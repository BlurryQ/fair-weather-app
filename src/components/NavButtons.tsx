import '../styles/forecast.css';

// types
import { DisplayNavButtons } from '../types/DisplayNavButtons';

export default function NavButtons({
  setChosenHour,
  displayNavButton,
}: {
  setChosenHour: React.Dispatch<React.SetStateAction<number>>;
  displayNavButton: DisplayNavButtons;
}): JSX.Element {
  const handleChange = (direct: string) => {
    if (direct === 'left') {
      setChosenHour((prev) => prev - 1);
    } else {
      setChosenHour((prev) => prev + 1);
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
