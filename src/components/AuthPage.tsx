import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import capitalisedEachWord from '../utils/capitalisedEachWord';
import PasswordChecklist from 'react-password-checklist';
import clearError from '../utils/clearError';
import authAction from '../utils/authAction';

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
  // Captured on first render, before anything can rewrite the URL.
  const [recovery] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      userId: params.get('userId') ?? '',
      secret: params.get('secret') ?? '',
    };
  });
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
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  useEffect(() => {
    resetInputs();
  }, [pageName]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const result = await authAction(
      pageName,
      { email, password, recovery },
      login
    );

    if (result.error) setError(result.error);
    if (result.success) setSuccess(result.success);
    if (result.resetInputs) resetInputs();
    // Reset Email leaves the user on the page, so its message self-clears after
    // a delay rather than lingering; an effect would also dismiss errors on the
    // pages that keep them until the next submit.
    if (result.clearAfterDelay) clearError(setError, setSuccess);
    if (result.redirect) navigate(result.redirect);

    setLoading(false);
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
      <form className="auth" onSubmit={handleSubmit}>
        {pageName !== 'Reset Password' && (
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={email}
          />
        )}
        {(pageName === 'Sign Up' || pageName !== 'Reset Email') && (
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={password}
          />
        )}
        {(pageName === 'Sign Up' || pageName === 'Reset Password') && (
          <>
            <input
              type="password"
              name="confirmPassword"
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
        {pageName === 'Reset Email' && (
          <>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
          </>
        )}
        <button
          className={passwordsMatch ? 'show-btn' : ''}
          type="submit"
          disabled={pageName === 'Sign Up' && !passwordsMatch}
        >
          {pageName === 'Reset Email' ? 'Reset Password' : pageName}
        </button>
      </form>
    </div>
  );
}
