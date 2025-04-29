import '../styles/settingsCard.css';
import { useState, ChangeEvent } from 'react';

// remove image default?
import defaultImage from '../assets/images/weather/sunny.png';

interface SettingsProps {
  title: string;
  initialValue: number;
  initialImage: string | null;
  settingOn: boolean;
}

export default function SettingsCard({
  // TODO remove props as will in one object
  // TODO work out where (component?) to get userdata from local storage
  title,
  initialValue,
  initialImage = defaultImage,
  settingOn,
}: SettingsProps) {
  const [value, setValue] = useState<number>(initialValue);
  const [image, setImage] = useState<string | null>(initialImage);
  const [isSettingOn, setIsSettingOn] = useState<boolean>(settingOn);

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

  const toggleSetting = () => {
    setIsSettingOn((prev) => !prev);
  };

  return (
    <div className="settings-card">
      {/* Toggle Sun/Moon */}
      <div className="settings-toggle" onClick={toggleSetting}>
        {isSettingOn ? (
          <span role="img" aria-label="Sun">
            ☀️
          </span>
        ) : (
          <span role="img" aria-label="Moon">
            🌙
          </span>
        )}
      </div>

      {/* Image */}
      <img src={image} alt="Uploaded" className="" />

      {/* Title */}
      <div className="">{title} TITLE</div>

      {/* Value Input */}
      <input
        type="number"
        className=""
        value={value}
        onChange={handleValueChange}
      />

      {/* Upload Image */}
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
