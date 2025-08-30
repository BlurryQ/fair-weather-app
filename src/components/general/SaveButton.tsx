import { useState } from 'react';

// context
import { useUser } from '../../context/UserContext';

// util
import updateUser from '../../utils/updateUser';
import { CoreSettings } from '../../types/settings/CoreSettings';
import { ImageSettings } from '../../types/settings/ImageSettings';

export default function SaveButton({
  disabled = false,
  type,
  settings,
  settingName,
  file,
  deleteImageData,
}: {
  disabled?: boolean;
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
    setSaveState('saving');
    if (file) {
      const fileData: [File, string] = [file, settings.id + '/' + settingName];
      await updateUser('file', fileData, setSaveState, updateUserSettings);
    }

    if (deleteImageData) {
      await updateUser(
        'deleteImage',
        deleteImageData,
        setSaveState,
        updateUserSettings
      );
    }

    await updateUser(type, settings, setSaveState, updateUserSettings);
    setTimeout(() => {
      setSaveState('save');
    }, 2000);
  };

  return (
    <button
      className={saveState}
      onClick={handleSave}
      disabled={saveState !== 'save' || disabled}
    >
      {saveState}
    </button>
  );
}
