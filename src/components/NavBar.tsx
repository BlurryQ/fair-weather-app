import '../styles/navBar.css';

export default function NavBar() {
  // get current user

  // TODO - get user from context
  const user: boolean = true;

  return (
    <ul className="nav-bar">
      {user ? (
        <>
          <li>
            <a href="/settings" className="settings-link">
              Settings
            </a>
          </li>
          <li>
            <a href="/logout" className="settings-link">
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
