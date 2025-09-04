import { Link, useNavigate } from 'react-router-dom';
import '../styles/navBar.css';
import { useUser } from '../context/UserContext';
import { ResetSearch } from '../types/ResetSearch';

export default function NavBar({ resetSearch }: { resetSearch: ResetSearch }) {
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
            <Link
              to="/settings"
              className="settings-link"
              onClick={resetSearch}
            >
              Settings
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="settings-link"
              onClick={() => {
                resetSearch();
                logoutUser();
              }}
            >
              Logout
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/sign_up" className="settings-link" onClick={resetSearch}>
              Sign Up
            </Link>
          </li>
          <li>
            <Link to="/log_in" className="settings-link" onClick={resetSearch}>
              Log In
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}
