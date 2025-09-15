import '../../styles/settingsCard.css';

import { useState, ChangeEvent, useEffect, useRef } from 'react';

// TODO uncomment below: part of the toggle series
// import Toggle from '../Toggle';
import '../../styles/toggle.css';

// component
import Loader from '../Loader';
import SaveButton from '../common/SaveButton';

// storage
import { getImageUrl } from '../../models/supabase/storage/imageStorage';

// types
import { SettingdCardData } from '../../types/settings/SettingsCardData';
import { ImageSettings } from '../../types/settings/ImageSettings';

// utils
import capitalisedEachWord from '../../utils/capitalisedEachWord';
import clearError from '../../utils/clearError';
import { formatImageSettingsForDB } from '../../utils/formatImageSettings';
import getSettingDetail from '../../utils/getSettingDetail';
import getMetrics from '../../utils/getMetrics';
import prepareImageForUpload from '../../utils/prepareImageForUpload';
import validateImageForUpload from '../../utils/validateImageForUpload';
import validateImageValue from '../../utils/validateImageValue';

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
  const inputRef = useRef<HTMLInputElement | null>(null);
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
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    setError('');
    setImageLoading(true);
    if (deleteImageData) setDeleteImageData(null);

    const file = e.target.files?.[0] as File;
    const imageValidationError: string = validateImageForUpload(file);
    if (imageValidationError) {
      setError(imageValidationError);
      return clearError(setError);
    }

    await prepareImageForUpload(file, setFile, setImage);
    setImageLoading(false);
  };

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentValue: number = Number(e.target.value);
    setValue(currentValue);

    const valueValidationError: string = validateImageValue(
      setting.name,
      currentValue
    );
    if (valueValidationError) return setError(valueValidationError);
    else setError('');

    setting['value'] = currentValue;
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
    if (inputRef.current) {
      inputRef.current.value = '';
    }
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
        ref={inputRef}
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
