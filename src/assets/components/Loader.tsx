import { CircleLoader } from 'react-spinners';

export default function Loader(): JSX.Element {
  return (
    <div className="loading">
      <h2>Loading data...</h2>
      <CircleLoader
        color={'#005086'}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
