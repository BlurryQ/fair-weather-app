import { Client, Account, Databases, Storage } from 'appwrite';

const endpoint: string = import.meta.env.VITE_APPWRITE_ENDPOINT;
const projectId: string = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client = new Client().setEndpoint(endpoint).setProject(projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Database + bucket are environment specific; collection ids are fixed by the
// setup script (scripts/setup-appwrite.mjs) so they can stay as constants.
export const DATABASE_ID: string = import.meta.env.VITE_APPWRITE_DATABASE_ID;
export const IMAGES_BUCKET_ID: string =
  import.meta.env.VITE_APPWRITE_BUCKET_ID || 'images';

export const CORE_SETTINGS_COLLECTION_ID = 'core_settings';
export const IMAGE_SETTINGS_COLLECTION_ID = 'image_settings';
export const IMAGES_COLLECTION_ID = 'images';

export default client;
