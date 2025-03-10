import '../styles/sunInfo.css';

// types
import { SunInfoProp } from '../types/SunInfoProp';

export default function Sunrise({
  sunData,
}: {
  sunData: SunInfoProp | null;
}): JSX.Element | null {
  if (!sunData) return null;

  return (
    <div className={`sun${sunData.type}`}>
      <p>{`Sun${sunData.type}`}:</p>
      <p>{sunData.time}</p>
    </div>
  );
}
