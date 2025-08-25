import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import { useState } from 'react';
import { signUpUser, signInUser } from '../models/supabase/auth/auth';
import { useUser } from '../context/UserContext';

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const heading = location.pathname === '/signup' ? 'Sign Up' : 'Log In';
  const buttonText = location.pathname === '/signup' ? 'Sign Up' : 'Log In';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const userContext = useUser();
  if (!userContext) return <></>;
  const { login } = userContext;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { placeholder, value } = e.target;
    if (placeholder === 'Email') {
      setEmail(value);
    } else if (placeholder === 'Password') {
      setPassword(value);
    } else if (placeholder === 'Confirm Password') {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    if (location.pathname === '/login') {
      const isSuccessful: boolean = await signInUser(email, password, login);
      if (!isSuccessful) {
        setError('Login failed. Please check your credentials.');
        setLoading(false);
        return;
      }
      setLoading(true);
      navigate('/');
    } else if (location.pathname === '/signup') {
      const isSuccessful: boolean = await signUpUser(email, password);
      if (!isSuccessful) {
        setError('Sign up failed. Please check your credentials.');
        setLoading(false);
        return;
      }
      setLoading(true);
      navigate('/login');
    }

    navigate('/');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="auth">
      <h1>{heading}</h1>
      {error && <div className="error">{error}</div>}
      <form className="auth">
        <input
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={password}
        />
        {location.pathname === '/signup' && (
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={confirmPassword}
          />
        )}
        <button type="submit" onClick={handleSubmit}>
          {buttonText}
        </button>
      </form>
    </div>
  );
}
