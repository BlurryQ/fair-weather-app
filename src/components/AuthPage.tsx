import { useLocation } from 'react-router-dom';
import '../styles/auth.css';
import { useState } from 'react';

// TODO remove
const url: string = import.meta.env.VITE_SUPABASE_URL;
const publicAnon: string = import.meta.env.VITE_SUPABASE_PUBLIC_ANON;
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(url, publicAnon);

export default function AuthPage() {
  const location = useLocation();
  const heading = location.pathname === '/signup' ? 'Sign Up' : 'Log In';
  const buttonText = location.pathname === '/signup' ? 'Sign Up' : 'Log In';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

  // TODO tidy below
  async function signUpUser(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      let { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      console.log('user', data.user);
    } catch (err: any) {
      console.error(err.message);
    }
  }

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
        <button type="submit" onClick={signUpUser}>
          {buttonText}
        </button>
      </form>
    </div>
  );
}
