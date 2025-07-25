import { useState } from 'react';

// context
import { useUser } from '../../context/UserContext';

// util
import updateUser from '../../utils/updateUser';
import { CoreSettings } from '../../types/settings/CoreSettings';
import { ImageSettings } from '../../types/settings/ImageSettings';
import { uploadImage } from '../../models/supabase/storage/imageStorage';

export default function SaveButton({
  type,
  settings,
  settingName,
  file,
}: {
  type: string;
  settings: CoreSettings | ImageSettings;
  settingName?: string;
  file?: File | null;
}): JSX.Element {
  const userContext = useUser();
  if (!userContext) return <></>;
  const { updateUserSettings } = userContext;

  const [saveState, setSaveState] = useState<string>('save');

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // TODO move below after sorting individual settings card saves
    if (file) {
      const imageName: string = settings.id + '/' + settingName;
      uploadImage(imageName, file as File).catch((error) => {
        console.error('Error uploading image:', error);
      });
    }
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
