import React, {
  createContext,
  useContext,
  useState,
  useRef,
  ReactNode,
  useEffect,
} from 'react';

// models
import getAllSettings from '../models/appwrite/tables/getAllSettings';
import { account } from '../models/appwrite/client';
import { signOutUser } from '../models/appwrite/auth/auth';

// types
import { AllSettings } from '../types/settings/AllSettings';
import { CoreSettings } from '../types/settings/CoreSettings';
import { ImageSettings } from '../types/settings/ImageSettings';
import { UserType } from '../types/UserType';

// utils
import validateSettings from '../utils/validateSettings';
import { getAllImageUrls } from '../models/appwrite/storage/imageStorage';
import { ImageUrls } from '../types/settings/ImageUrls';

const noUser: UserType = {
  id: '',
  email: '',
};

// Single-entry edits to the imageUrls list, kept out of the setUser updater so
// each branch there stays a one-liner. Both return a new array.
const upsertImageUrl = (
  imageUrls: ImageUrls[],
  name: string,
  url: string
): ImageUrls[] =>
  imageUrls.some((entry) => entry.name === name)
    ? imageUrls.map((entry) => (entry.name === name ? { ...entry, url } : entry))
    : [...imageUrls, { name, url }];

const removeImageUrl = (imageUrls: ImageUrls[], name: string): ImageUrls[] =>
  imageUrls.filter((entry) => entry.name !== name);

type UserContextType = {
  user: UserType;
  login: (userData: UserType) => void;
  logout: () => void;
  updateUserSettings: (
    settingType: string,
    userUpdates: AllSettings | CoreSettings | ImageSettings | string[]
  ) => void;
  updateImageUrls: (id: string) => Promise<void>;
  refreshAllSettings: (id: string) => Promise<void>;
  settingsRefreshing: boolean;
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

  // True while a full settings refresh is in flight. DogGrid dims the grid
  // rather than each instance kicking off its own refetch on render.
  const [settingsRefreshing, setSettingsRefreshing] = useState(false);
  const lastRefreshRef = useRef(0);

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

  // Reconcile the persisted user with the live Appwrite session on load.
  // A stale session (e.g. a leftover Supabase login) resolves to logged-out.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const acc = await account.get();
        if (cancelled) return;
        if (acc.$id !== user.id) {
          login({
            id: acc.$id,
            email: acc.email,
            confirmed_at: acc.registration || acc.$createdAt,
          } as UserType);
        } else if (validateSettings(user.settings)) {
          // Same session across a reload: the previous session's image object
          // URLs are dead and settings may have changed on another device, so
          // pull the whole payload fresh rather than just the image URLs.
          refreshAllSettings(acc.$id);
        }
      } catch {
        if (!cancelled && user.id) logout();
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Object URLs and setting values go stale after an hour (or when another
  // device changes them). Refresh the whole payload centrally so every DogGrid
  // stays aligned, instead of each one refetching from its render body.
  useEffect(() => {
    const timestamp = user.settings?.timestamp;
    if (!user.id || !timestamp) return;
    const ONE_HOUR = 1000 * 60 * 60;
    if (Date.now() - timestamp > ONE_HOUR) {
      refreshAllSettings(user.id);
    }
  }, [user]);

  const login = (userData: UserType) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    if (user.id) signOutUser();
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
        // A full refresh brings a fresh set of object URLs; release the old ones.
        const previous: ImageUrls[] = updatedUser.settings?.imageUrls || [];
        previous.forEach((entry: ImageUrls) => {
          if (entry.url?.startsWith('blob:')) URL.revokeObjectURL(entry.url);
        });
        updatedUser.settings = settings as AllSettings;
      } else if (settingsType === 'imageUrls') {
        // Release the previous session's object URLs before replacing them.
        const previous: ImageUrls[] = updatedUser.settings?.imageUrls || [];
        previous.forEach((entry: ImageUrls) => {
          if (entry.url?.startsWith('blob:')) URL.revokeObjectURL(entry.url);
        });
        updatedUser.settings.imageUrls = settings as ImageUrls;
        updatedUser.settings.timestamp = new Date().getTime();
      } else if (settingsType === 'file') {
        const [imageName, newImageUrl] = settings as [string, string];
        updatedUser.settings.imageUrls = upsertImageUrl(
          updatedUser.settings.imageUrls,
          imageName,
          newImageUrl
        );
      } else if (settingsType === 'deleteImage') {
        const [, imageName] = settings as string[];
        updatedUser.settings.imageUrls = removeImageUrl(
          updatedUser.settings.imageUrls,
          imageName
        );
      }

      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const updateImageUrls = async (id: string) => {
    const images = await getAllImageUrls(id);
    updateUserSettings('imageUrls', images as ImageUrls);
  };

  // Pull core settings, image settings and image URLs in one go. Guarded so
  // overlapping triggers (reload + expiry check) don't fire duplicate fetches.
  const refreshAllSettings = async (id: string) => {
    if (!id) return;
    if (settingsRefreshing || Date.now() - lastRefreshRef.current < 5000) return;
    lastRefreshRef.current = Date.now();
    setSettingsRefreshing(true);
    try {
      const settings = await getAllSettings();
      updateUserSettings('all', settings);
    } catch (error) {
      console.error('Failed to refresh settings:', error);
    } finally {
      setSettingsRefreshing(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        updateUserSettings,
        updateImageUrls,
        refreshAllSettings,
        settingsRefreshing,
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
