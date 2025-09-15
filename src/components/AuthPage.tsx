import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import { useEffect, useState } from 'react';
import {
  signUpUser,
  signInUser,
  resetPassword,
  updatePassword,
} from '../models/supabase/auth/auth';
import { useUser } from '../context/UserContext';
import capitalisedEachWord from '../utils/capitalisedEachWord';
import PasswordChecklist from 'react-password-checklist';
import clearError from '../utils/clearError';

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const pageName: string = capitalisedEachWord(
    location.pathname.split('/').pop() as string
  );
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false);
  const userContext = useUser();
  if (!userContext) return <></>;
  const { login } = userContext;

  const resetInputs = (): void => {
    setError('');
    setSuccess('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO use id or name rather than placeholder
    const { placeholder, value } = e.target;
    if (placeholder === 'Email') {
      setEmail(value);
    } else if (placeholder === 'Password') {
      setPassword(value);
    } else if (placeholder === 'Confirm Password') {
      setConfirmPassword(value);
    }
  };

  useEffect(() => {
    resetInputs();
  }, [pageName]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // TODO util function? takes pagename and authObj?
    // TODO onSubmit in form not handler
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    if (pageName === 'Log In') {
      const isSuccessful: boolean = await signInUser(email, password, login);
      if (!isSuccessful) {
        setError('Login failed. Please check your credentials.');
      } else {
        navigate('/');
      }
    } else if (pageName === 'Sign Up') {
      const isSuccessful: boolean = await signUpUser(email, password);
      if (!isSuccessful) {
        setError('Sign up failed. Please check your credentials.');
      } else {
        resetInputs();
        setSuccess(
          'Sign up successful. Please check your email for a confirmation link.'
        );
      }
    } else if (pageName === 'Reset Email') {
      const isSuccessful: boolean = await resetPassword(email);
      if (!isSuccessful)
        setError(
          'Cannot find this email address. Please check your credentials.'
        );
      else
        setSuccess(
          'If this email exists on our database an email will be sent.'
        );

      // TODO use fx?
      clearError(setError, setSuccess);
    } else if (pageName === 'Reset Password') {
      const isSuccessful: any = await updatePassword(password);
      if (!isSuccessful)
        setError('Error updating password. Please try again later.');
      else
        setSuccess('Password updated successfully. Please log in to continue.');
      navigate('/log_in');
    }
    return setLoading(false);
  };

  const handlePasswordReset = async () => {
    navigate('/reset_email');
  };

  // TODO pimp loading
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="auth">
      <h1>{pageName === 'Reset Email' ? 'Reset Password' : pageName}</h1>
      {pageName === 'Reset Email' && <p>Please enter your email address.</p>}
      <form className="auth">
        {pageName !== 'Reset Password' && (
          <input
            type="email"
            placeholder="Email"
            onChange={handleChange}
            value={email}
          />
        )}
        {(pageName === 'Sign Up' || pageName !== 'Reset Email') && (
          <input
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={password}
          />
        )}
        {(pageName === 'Sign Up' || pageName === 'Reset Password') && (
          <>
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
              value={confirmPassword}
            />

            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
            <PasswordChecklist
              style={{ color: 'white%' }}
              rules={[
                'minLength',
                'maxLength',
                'specialChar',
                'number',
                'capital',
                'match',
              ]}
              minLength={8}
              maxLength={25}
              value={password}
              valueAgain={confirmPassword}
              onChange={(match) => {
                setPasswordsMatch(match);
              }}
            />
          </>
        )}
        {pageName === 'Log In' && (
          <>
            <button
              type="button"
              onClick={handlePasswordReset}
              className={'reset-password'}
            >
              Reset Password
            </button>
            {error && <div className="error">{error}</div>}
          </>
        )}
        <button
          className={passwordsMatch ? 'show-btn' : ''}
          type="submit"
          onClick={handleSubmit}
          disabled={pageName === 'Sign Up' && !passwordsMatch}
        >
          {pageName === 'Reset Email' ? 'Reset Password' : pageName}
        </button>
      </form>
    </div>
  );
}
