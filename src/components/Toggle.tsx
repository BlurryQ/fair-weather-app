import '../styles/toggle.css';

export default function Toggle({
  state,
  setState,
  label,
}: {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  label: string;
}) {
  return (
    <label htmlFor={label}>
      {label.includes('card') ? '' : label + ':'}
      <input
        className="switch"
        id={label}
        type="checkbox"
        onChange={() => setState(!state)}
        checked={state}
      />
      <span className="slider"></span>
    </label>
  );
}
