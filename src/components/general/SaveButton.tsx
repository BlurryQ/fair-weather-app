import { useState } from 'react';

// context
import { useUser } from '../../context/UserContext';

// util
import updateUser from '../../utils/updateUser';
import { CoreSettings } from '../../types/settings/CoreSettings';
import { ImageSettings } from '../../types/settings/ImageSettings';
import {
  deleteImage,
  uploadImage,
} from '../../models/supabase/storage/imageStorage';

export default function SaveButton({
  type,
  settings,
  settingName,
  file,
  deleteImageData,
}: {
  type: string;
  settings: CoreSettings | ImageSettings;
  settingName?: string;
  file?: File | null;
  deleteImageData?: string[] | null;
}): JSX.Element {
  const userContext = useUser();
  if (!userContext) return <></>;
  const { updateUserSettings } = userContext;

  const [saveState, setSaveState] = useState<string>('save');

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // TODO move below after sorting individual settings card saves
    // to updateUser.ts?
    if (file) {
      console.log(file);
      const imageName: string = settings.id + '/' + settingName;
      uploadImage(imageName, file as File).catch((error) => {
        console.error('Error uploading image:', error);
      });
    }

    if (deleteImageData) {
      // await updateUser('deleteImage', deleteImageData, setSaveState);
      deleteImage(deleteImageData);
    }

    // updateUser takes in the various data types and organises them?
    // type = file, settings = [imageName, file]
    // type = deleteImage, settings = deleteImageData
    setSaveState('saving');
    await updateUser(type, settings, setSaveState, updateUserSettings);
    setTimeout(() => {
      setSaveState('save');
    }, 2000);
  };

  return (
    <button
      className={saveState}
      onClick={handleSave}
      disabled={saveState !== 'save'}
    >
      {saveState}
    </button>
  );
}
