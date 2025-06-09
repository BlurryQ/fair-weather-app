import '../styles/settingsCard.css';
import { useState, ChangeEvent, useEffect } from 'react';

// remove image default?
import defaultImage from '../assets/images/weather/sunny.png';
import Toggle from './Toggle';

// types
import { SettingdCardData } from '../types/settings/SettingsCardData';

export default function SettingsCard({
  index,
  setting,
}: {
  index: number;
  setting: SettingdCardData;
}) {
  const [value, setValue] = useState<number>(setting.value); // Example value, can be changed
  const [image, setImage] = useState<string>(defaultImage);
  const [isSettingOn, setIsSettingOn] = useState<boolean>(true);

  const changeCardColor = () => {
    const card = document.querySelectorAll('.settings-card');
    if (card[index].classList[1] === 'disabled') {
      card[index].classList.remove('disabled');
    } else {
      card[index].classList.add('disabled');
    }
  };

  useEffect(() => {
    changeCardColor();
  }, [isSettingOn]);

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
      <Toggle
        state={isSettingOn}
        setState={setIsSettingOn}
        label={'card-' + index}
      />

      <img src={image} alt="Uploaded" />

      <div>{setting.name}</div>

      <input type="number" value={value} onChange={handleValueChange} />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="file-input"
      />

      <button className="save">Save</button>
    </div>
  );
}
