import '../../styles/settingsCard.css';

import { useState, ChangeEvent, useEffect } from 'react';

// TODO uncomment below: part of the toggle series
// import Toggle from '../Toggle';
import '../../styles/toggle.css';

// component
import Loader from '../Loader';
import SaveButton from '../general/SaveButton';

// storage
import { getImageUrl } from '../../models/supabase/storage/imageStorage';

// types
import { SettingdCardData } from '../../types/settings/SettingsCardData';
import { ImageSettings } from '../../types/settings/ImageSettings';
import { LimitProp } from '../../types/LimitProp';

// utils
import capitalisedEachWord from '../../utils/capitalisedEachWord';
import { formatImageSettingsForDB } from '../../utils/formatImageSettings';
import imageCompression from 'browser-image-compression';
import getValueLimits from '../../utils/getValueLimits';
import getSettingDetail from '../../utils/getSettingDetail';
import getMetrics from '../../utils/getMetrics';

export default function SettingsCard({
  // TODO uncomment below: part of the toggle series
  // index,
  setting,
  imageSettings,
}: {
  // TODO uncomment below: part of the toggle series
  // index: number;
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
  // TODO uncomment below: part of the toggle series
  // const [isSettingOn, setIsSettingOn] = useState<boolean>(setting.active);
  const [deleteImageData, setDeleteImageData] = useState<string[] | null>(null);
  const [newImageSettings, setNewImageSettings] = useState<ImageSettings>({
    ...imageSettings,
  });

  const isGoodDay: boolean = setting.name === 'good_day';

  let settingName: string = setting.name;
  if (settingName === 'high_temp') settingName = 'Warm';
  else if (settingName === 'low_temp') settingName = 'Cold';
  else if (settingName === 'good_day') settingName = 'Hot';

  // TODO uncomment below: part of the toggle series
  // const changeCardColor = () => {
  //   const cards = document.querySelectorAll('.settings-card');
  //   // TODO get card to toggle correct color on first toggle when false
  //   if (cards[index].classList[1] === 'disabled') {
  //     cards[index].classList.remove('disabled');
  //   } else {
  //     cards[index].classList.add('disabled');
  //   }
  // };

  useEffect(
    () => {
      // TODO uncomment below: part of the toggle series
      // changeCardColor();

      getImageUrl(imageSettings.id + '/' + setting.name).then((url) => {
        if (url) setImage(url);
        setImageLoading(false);
      });
    },
    [
      /* isSettingOn */
    ]
  );

  // TODO make below a function
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    setError('');
    const file = e.target.files?.[0] as File;

    const maxSize = 12 * 1024 * 1024; // 12 MB in bytes

    if (file.size > maxSize) {
      setError('File must be under 5MB');
      return setTimeout(() => {
        setError('');
      }, 3000);
    }

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 250,
      useWebWorker: true,
    };
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

  // TODO make below a function
  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentValue: number = Number(e.target.value);
    setValue(Number(e.target.value));
    setting['value'] = Number(currentValue);
    const oppositeValue: LimitProp = getValueLimits(
      setting.name,
      imageSettings
    );
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
      {/* // TODO uncomment below: part of the toggle series */}
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

      <p>{capitalisedEachWord(settingName)}</p>

      <p className="detail">{getSettingDetail(settingName)}</p>

      <div className="value-metric">
        <input
          id={setting.name + '_value'}
          type="number"
          value={isGoodDay ? imageSettings.high_temp : value}
          onChange={handleValueChange}
          className={`value ${isGoodDay ? 'disabled' : ''}`}
          disabled={isGoodDay}
        />
        <div className="metric">{getMetrics(settingName)}</div>
      </div>

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
