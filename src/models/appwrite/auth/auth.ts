import { ID, Models } from 'appwrite';
import { account } from '../client';
import provisionUserSettings from '../tables/provisionUser';

type MappedUser = { id: string; email: string; confirmed_at: string };
type LoginFn = (user: MappedUser) => void;

function mapUser(acc: Models.User<Models.Preferences>): MappedUser {
  return {
    id: acc.$id,
    email: acc.email,
    // Keeps the `confirmed_at` key the app uses as a "logged in" marker.
    confirmed_at: acc.registration || acc.$createdAt || new Date().toISOString(),
  };
}

async function clearExistingSession(): Promise<void> {
  try {
    await account.deleteSession('current');
  } catch {
    // no active session - nothing to clear
  }
}

export async function signUpUser(
  email: string,
  password: string,
  login: LoginFn
): Promise<boolean> {
  try {
    await clearExistingSession();
    await account.create(ID.unique(), email, password);
    await account.createEmailPasswordSession(email, password);
    const user = await account.get();
    await provisionUserSettings(user.$id);
    login(mapUser(user));
    return true;
  } catch (err: any) {
    console.error(err.message);
    return false;
  }
}

export async function signInUser(
  email: string,
  password: string,
  login: LoginFn
) {
  try {
    await clearExistingSession();
    await account.createEmailPasswordSession(email, password);
    const user = await account.get();
    login(mapUser(user));
    return true;
  } catch (err: any) {
    console.error(err.message);
    return false;
  }
}

export async function signOutUser() {
  try {
    await account.deleteSession('current');
    console.log('User signed out');
  } catch (err: any) {
    console.error(err.message);
  }
}

export async function resetPassword(email: string) {
  try {
    await account.createRecovery(
      email,
      `${window.location.origin}/reset_password`
    );
    return true;
  } catch (err: any) {
    console.error(err.message);
    return false;
  }
}

export async function updatePassword(
  password: string,
  userId: string,
  secret: string
) {
  try {
    // userId + secret come from the ?userId=&secret= Appwrite appends to the
    // recovery redirect URL, captured by AuthPage before the URL can change.
    if (!userId || !secret) throw new Error('Missing recovery parameters');
    await account.updateRecovery(userId, secret, password);
    console.log('User updated');
    return true;
  } catch (err: any) {
    console.error(err.message);
    return false;
  }
}
