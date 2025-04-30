import '../styles/auth.css';

export default function Login() {
  return (
    <div className="auth">
      <h1>Log In</h1>
      <form className="auth">
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
