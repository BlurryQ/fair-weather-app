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
import imageCompression from 'browser-image-compression';

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
  const images: Record<string, { default: string }> = import.meta.glob(
    '../../assets/images/weather/*.png',
    { eager: true }
  );
  const defaultImage =
    images[`../../assets/images/weather/${setting.name}.png`]?.default;
  const [image, setImage] = useState<string>(defaultImage);
  const [file, setFile] = useState<File | null>(null);
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // TODO if setting === active, set isSettingOn to true
  const [isSettingOn, setIsSettingOn] = useState<boolean>(setting.active);
  const [deleteImageData, setDeleteImageData] = useState<string[] | null>(null);
  const [newImageSettings, setNewImageSettings] = useState<ImageSettings>({
    ...imageSettings,
  });

  // TODO refactor
  type limitProp = {
    name: string;
    type: string;
    value: number;
  };

  const getValueLimits = () => {
    const isHigh: boolean = setting.name.split('_').shift() === 'high';
    const oppositeSetting: string = isHigh
      ? setting.name.replace('high', 'low')
      : setting.name.replace('low', 'high');

    // TODO TS and type this
    const limits: limitProp = {
      name: oppositeSetting,
      type: 'any', // higher/ lower/ any
      value: 0,
    };
    if (setting.name === oppositeSetting) return limits;

    limits.type = isHigh ? 'lower' : 'higher';
    limits.value = imageSettings[
      oppositeSetting as keyof ImageSettings
    ] as number;
    return limits;
  };

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

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    setError('');
    const file = e.target.files?.[0] as File;

    const maxSize = 5 * 1024 * 1024; // 5 MB in bytes

    if (file.size > maxSize) {
      setError('File must be under 5MB');
      return setTimeout(() => {
        setError('');
      }, 1500);
    }

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 250,
      useWebWorker: true,
    };
    // TODO add image uploading spinner
    setImageLoading(true);
    try {
      const compressedFile = await imageCompression(file, options);
      if (compressedFile) {
        const imageUrl = URL.createObjectURL(compressedFile);
        setImage(imageUrl);
        setFile(compressedFile);
        if (deleteImageData) setDeleteImageData(null);
      }
      setImageLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentValue: number = Number(e.target.value);
    setValue(Number(e.target.value));
    setting['value'] = Number(currentValue);
    const oppositeValue: limitProp = getValueLimits();
    if (oppositeValue.type === 'higher') {
      if (currentValue >= oppositeValue.value) {
        setError('Must be higher than ' + oppositeValue.value);
      } else {
        setError('');
      }
    } else if (oppositeValue.type === 'lower') {
      if (currentValue <= oppositeValue.value) {
        setError('Must be lower ' + oppositeValue.value);
      } else {
        setError('');
      }
    }
    imageSettings = formatImageSettingsForDB(
      setting,
      newImageSettings
    ) as ImageSettings;
    setNewImageSettings(imageSettings);
  };

  const resetImageHandler = (e: any) => {
    e.preventDefault();
    setImage(defaultImage);
    setDeleteImageData([imageSettings.id, setting.name]);
    if (file) setFile(null);
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
          {image !== defaultImage && (
            <button className="image-reset" onClick={resetImageHandler}>
              x
            </button>
          )}
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
        disabled={!!error}
        type="image"
        settings={newImageSettings}
        settingName={setting.name}
        file={file}
        deleteImageData={deleteImageData}
      />

      <div className={error ? 'error' : 'invisible'}>
        {error || 'placeholder'}
      </div>
    </div>
  );
}
