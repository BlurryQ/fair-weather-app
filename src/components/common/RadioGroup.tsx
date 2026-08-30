import { Fragment } from 'react';

export type RadioOption = {
  id: string;
  label: string;
  checked: boolean;
};

// A <legend> plus a row of mutually-exclusive radios. Inputs stay uncontrolled
// (defaultChecked) exactly like the markup this replaced, so the parent reads
// the current choice from its own state on save rather than from React.
export default function RadioGroup({
  legend,
  name,
  options,
  onChange,
}: {
  legend: string;
  name: string;
  options: RadioOption[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <legend>{legend}:</legend>
      <div className="setting-group">
        {options.map((option) => (
          <Fragment key={option.id}>
            <label htmlFor={option.id}>{option.label}:</label>
            <input
              className="radio"
              id={option.id}
              name={name}
              type="radio"
              defaultChecked={option.checked}
              onChange={onChange}
            />
          </Fragment>
        ))}
      </div>
    </>
  );
}
