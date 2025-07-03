import { Link, useNavigate } from 'react-router-dom';
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
            <Link to="/settings" className="settings-link">
              Settings
            </Link>
          </li>
          <li>
            <Link to="/" className="settings-link" onClick={logoutUser}>
              Logout
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/signup" className="settings-link">
              Sign Up
            </Link>
          </li>
          <li>
            <Link to="/login" className="settings-link">
              Log In
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}
