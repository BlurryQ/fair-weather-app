import { useNavigate } from 'react-router-dom';
import '../styles/navBar.css';
import { useUser } from '../context/UserContext';

export default function NavBar() {
  const navigate = useNavigate();
  const userContext = useUser();
  if (!userContext) return <></>;
  const { user, logout } = userContext;

  // Timeout is needed to prevent "Log Out" changing to "Log In"
  const logoutUser = async () => {
    setTimeout(() => {
      logout();
    }, 0);
    navigate('/');
  };

  return (
    <ul className="nav-bar">
      {user.id ? (
        <>
          <li>
            <a href="/settings" className="settings-link">
              Settings
            </a>
          </li>
          <li>
            <a href="/" className="settings-link" onClick={logoutUser}>
              Logout
            </a>
          </li>
        </>
      ) : (
        <>
          <li>
            <a href="/signup" className="settings-link">
              Sign Up
            </a>
          </li>
          <li>
            <a href="/login" className="settings-link">
              Log In
            </a>
          </li>
        </>
      )}
    </ul>
  );
}
