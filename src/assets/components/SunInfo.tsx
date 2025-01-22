import '../styles/sunInfo.css';

import { SunInfoProp } from '../types/SunInfoProp';

export default function Sunrise({
  sunData,
}: {
  sunData: SunInfoProp;
}): JSX.Element {
  return (
    <div className={`sun${sunData.type}`}>
      <p>{`Sun${sunData.type}`}:</p>
      <p>{sunData.time}</p>
    </div>
  );
}
