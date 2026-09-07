import { CircleLoader } from 'react-spinners';

// Compact spinner for image-sized slots (settings cards, the weather grid)
// where the full-screen animated weather scene in <Loader /> is far too much.
export default function ImageLoader(): JSX.Element {
  return (
    <div className="loading">
      <CircleLoader
        color={'#005086'}
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
