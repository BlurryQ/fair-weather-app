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
      console.log(value);
      setPassword(value);
    } else if (placeholder === 'Confirm Password') {
      console.log(value);
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (location.pathname === '/login') {
      await signInUser(email, password, login);
      navigate('/');
    } else if (location.pathname === '/signup') {
      await signUpUser(email, password);
      navigate('/login');
    }

    navigate('/');
  };

  return (
    <div className="auth">
      <h1>{heading}</h1>
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
