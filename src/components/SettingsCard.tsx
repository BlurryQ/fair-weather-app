import '../styles/settingsCard.css';
import { useState, ChangeEvent } from 'react';

// remove image default?
import defaultImage from '../assets/images/weather/sunny.png';
import Toggle from './Toggle';

export default function SettingsCard() {
  const [value, setValue] = useState<number>(9);
  const [image, setImage] = useState<string>(defaultImage);
  const [isSettingOn, setIsSettingOn] = useState<boolean>(true);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  return (
    <div className="settings-card">
      <Toggle state={isSettingOn} setState={setIsSettingOn} label="card" />

      <img src={image} alt="Uploaded" />

      <div>TITLE</div>

      <input type="number" value={value} onChange={handleValueChange} />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="file-input"
      />
      <button className="">Save</button>
    </div>
  );
}
