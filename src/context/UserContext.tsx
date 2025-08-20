import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

// models
import getAllSettings from '../models/supabase/tables/getAllSettings';

// types
import { AllSettings } from '../types/settings/AllSettings';
import { CoreSettings } from '../types/settings/CoreSettings';
import { ImageSettings } from '../types/settings/ImageSettings';
import { UserType } from '../types/UserType';

// utils
import validateSettings from '../utils/validateSettings';
import { getAllImageUrls } from '../models/supabase/storage/imageStorage';
import { ImageUrls } from '../types/settings/ImageUrls';

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
    userUpdates: AllSettings | CoreSettings | ImageSettings | string[]
  ) => void;
  updateImageUrls: (id: string) => Promise<void>;
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

  const updateUserSettings = async (
    settingsType: string,
    settings: CoreSettings | ImageSettings | AllSettings | string[] | ImageUrls
  ) => {
    setUser((prevUser: any) => {
      let updatedUser = { ...prevUser };

      if (settingsType === 'image') {
        updatedUser.settings.imageSettings = settings as ImageSettings;
      } else if (settingsType === 'core') {
        updatedUser.settings.coreSettings = settings as CoreSettings;
      } else if (settingsType === 'all') {
        updatedUser.settings = settings as AllSettings;
      } else if (settingsType === 'imageUrls') {
        updatedUser.settings.imageUrls = settings as ImageUrls;
        updatedUser.settings.timestamp = new Date().getTime();
      } else if (settingsType === 'file') {
        const [imageName, newImageUrl] = settings as [string, string];

        // TODO move below, returning updatedUser
        const imageUrls: ImageUrls[] = [...updatedUser.settings.imageUrls];
        const urlExists = imageUrls.findIndex(
          (imageUrl: ImageUrls) => imageUrl.name === imageName
        );
        if (urlExists === -1)
          imageUrls.push({
            name: imageName,
            url: newImageUrl,
          });
        else {
          imageUrls.map((imageUrl: ImageUrls) => {
            if (imageUrl.name === imageName) {
              imageUrl.url = newImageUrl;
            } else {
              imageUrl.url = imageUrl.url;
            }
            return imageUrl;
          });
        }
        updatedUser.settings.imageUrls = imageUrls;
      } else if (settingsType === 'deleteImage') {
        // TODO move below, returning updatedUser (maybe make into one functions)
        const imageUrls: ImageUrls[] = [...updatedUser.settings.imageUrls];
        const [, imageName] = settings as string[];
        const urlIndex = imageUrls.findIndex(
          (imageUrl: ImageUrls) => imageUrl.name === imageName
        );

        imageUrls.splice(urlIndex, 1);

        updatedUser.settings.imageUrls = imageUrls;
      }

      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const updateImageUrls = async (id: string) => {
    const images = await getAllImageUrls(id);
    updateUserSettings('imageUrls', images as ImageUrls);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        updateUserSettings,
        updateImageUrls,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};
