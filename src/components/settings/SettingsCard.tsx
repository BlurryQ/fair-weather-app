import '../../styles/settingsCard.css';
import { useState, ChangeEvent, useEffect } from 'react';

import Toggle from '../Toggle';

// TODO remove below once Toggle is live#
import '../../styles/toggle.css';

// component
import Loader from '../Loader';
import SaveButton from '../general/SaveButton';

// storage
import { getImageUrl } from '../../models/supabase/storage/imageStorage';

// types
import { SettingdCardData } from '../../types/settings/SettingsCardData';
import { ImageSettings } from '../../types/settings/ImageSettings';

// utils
import capitalisedEachWord from '../../utils/capitalisedEachWord';
import { formatImageSettingsForDB } from '../../utils/formatImageSettings';

export default function SettingsCard({
  index,
  setting,
  imageSettings,
}: {
  index: number;
  setting: SettingdCardData;
  imageSettings: ImageSettings;
}) {
  const [value, setValue] = useState<number>(setting.value);
  // TODO storage api request for image // save on context?

  const images: Record<string, { default: string }> = import.meta.glob(
    '../../assets/images/weather/*.png',
    { eager: true }
  );
  const defaultImage =
    images[`../../assets/images/weather/${setting.name}.png`]?.default;
  const [image, setImage] = useState<string>(defaultImage);
  const [file, setFile] = useState<File | null>(null);
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  // TODO if setting === active, set isSettingOn to true
  const [isSettingOn, setIsSettingOn] = useState<boolean>(setting.active);
  const [newImageSettings, setNewImageSettings] = useState<ImageSettings>({
    ...imageSettings,
  });

  // build settings object
  // dynamically update with values
  // pass this to SaveButton
  // const [settings, setSettings] = useState<SettingdCardData>({
  //   name: setting.name,
  //   active: setting.active,
  //   value: setting.value,
  // });

  const changeCardColor = () => {
    const cards = document.querySelectorAll('.settings-card');
    // TODO get card to toggle correct color on first toggle when false
    if (cards[index].classList[1] === 'disabled') {
      cards[index].classList.remove('disabled');
    } else {
      cards[index].classList.add('disabled');
    }
  };

  useEffect(() => {
    changeCardColor();

    getImageUrl(imageSettings.id + '/' + setting.name).then((url) => {
      if (url) setImage(url);
      setImageLoading(false);
    });
  }, [isSettingOn]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      console.log(imageUrl);
      setFile(file);
    }
  };

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
    setting['value'] = Number(e.target.value);
    imageSettings = formatImageSettingsForDB(
      setting,
      newImageSettings
    ) as ImageSettings;
    setNewImageSettings(imageSettings);
  };

  const resetImageHandler = (e: any) => {
    e.preventDefault();
    setImage(defaultImage);
    console.log(defaultImage);
  };

  return (
    <div className={'settings-card'}>
      {/* <Toggle
        state={isSettingOn}
        setState={setIsSettingOn}
        label={'card-' + index}
      /> */}

      {imageLoading ? (
        <Loader />
      ) : (
        <div>
          <button className="image-reset" onClick={resetImageHandler}>
            x
          </button>
          <img src={image} alt="Uploaded" className="image" />
        </div>
      )}

      <div>{capitalisedEachWord(setting.name)}</div>

      <input
        id={setting.name + '_value'}
        type="number"
        value={value}
        onChange={handleValueChange}
        className={setting.name === 'good_day' ? 'invisible' : ''}
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="file-input"
      />

      <SaveButton
        type="image"
        settings={newImageSettings}
        settingName={setting.name}
        file={file}
      />
    </div>
  );
}
