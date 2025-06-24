import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

// models
import getAllSettings from '../models/supabase/tables/getAllSettings';
import { updateCoreSettings } from '../models/supabase/tables/coreSettings';

// types
import { AllSettings } from '../types/settings/AllSettings';
import { CoreSettings } from '../types/settings/CoreSettings';
import { ImageSettings } from '../types/settings/ImageSettings';
import { UserType } from '../types/UserType';

// utils
import validateSettings from '../utils/validateSettings';

const noUser: UserType = {
  id: '',
  email: '',
};

type UserContextType = {
  user: UserType;
  login: (userData: UserType) => void;
  logout: () => void;
  updateUserSettings: (
    settingType: string,
    userUpdates: AllSettings | CoreSettings | ImageSettings
  ) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : noUser;
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settings = await getAllSettings();
        updateUserSettings('all', settings);
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      }
    };

    if (user.id && !validateSettings(user.settings)) {
      fetchSettings();
    }
  }, [user]);

  const login = (userData: UserType) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(noUser);
    localStorage.removeItem('user');
  };

  const updateUserSettings = (
    settingsType: string,
    settings: AllSettings | CoreSettings | ImageSettings
  ): void => {
    setUser((prevUser: any) => {
      let updatedUser = { ...prevUser, settings: { ...settings } };
      if (settingsType === 'images')
        updatedUser.settings.imageSettings = settings as ImageSettings;
      else if (settingsType === 'all')
        updatedUser.settings = settings as AllSettings;
      else if (settingsType === 'core') {
        updateCoreSettings(settings as CoreSettings).then((response) => {
          if (response) {
            updatedUser.settings.coreSettings = settings as CoreSettings;
          } else {
            console.error('Failed to update core settings');
          }
        });
      }

      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUserSettings }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};
