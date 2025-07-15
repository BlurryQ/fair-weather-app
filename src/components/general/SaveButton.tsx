import { useState } from 'react';

// context
import { useUser } from '../../context/UserContext';

// util
import updateUser from '../../utils/updateUser';
import { CoreSettings } from '../../types/settings/CoreSettings';
import { ImageSettings } from '../../types/settings/ImageSettings';

export default function SaveButton({
  type,
  settings,
}: {
  type: string;
  settings: CoreSettings | ImageSettings;
}): JSX.Element {
  const userContext = useUser();
  if (!userContext) return <></>;
  const { updateUserSettings } = userContext;

  const [saveState, setSaveState] = useState<string>('save');

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
