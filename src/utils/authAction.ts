import {
  signUpUser,
  signInUser,
  resetPassword,
  updatePassword,
} from '../models/appwrite/auth/auth';

type LoginFn = Parameters<typeof signInUser>[2];

type AuthInput = {
  email: string;
  password: string;
  recovery: { userId: string; secret: string };
};

export type AuthResult = {
  error?: string;
  success?: string;
  redirect?: string;
  resetInputs?: boolean;
  clearAfterDelay?: boolean;
};

// Runs the Appwrite call for whichever auth page we're on and returns a plain
// result the component turns into state + navigation. Keeps AuthPage's submit
// handler free of the per-page branching.
export default async function authAction(
  pageName: string,
  { email, password, recovery }: AuthInput,
  login: LoginFn
): Promise<AuthResult> {
  if (pageName === 'Log In') {
    const ok = await signInUser(email, password, login);
    return ok
      ? { redirect: '/' }
      : { error: 'Login failed. Please check your credentials.' };
  }

  if (pageName === 'Sign Up') {
    const ok = await signUpUser(email, password, login);
    return ok
      ? { redirect: '/', resetInputs: true }
      : { error: 'Sign up failed. Please check your credentials.' };
  }

  if (pageName === 'Reset Email') {
    const ok = await resetPassword(email);
    return ok
      ? {
          success: 'If this email exists on our database an email will be sent.',
          clearAfterDelay: true,
        }
      : {
          error:
            'Cannot find this email address. Please check your credentials.',
          clearAfterDelay: true,
        };
  }

  if (pageName === 'Reset Password') {
    const ok = await updatePassword(password, recovery.userId, recovery.secret);
    return ok
      ? {
          success: 'Password updated successfully. Please log in to continue.',
          redirect: '/log_in',
        }
      : { error: 'Error updating password. Please try again later.' };
  }

  return {};
}
