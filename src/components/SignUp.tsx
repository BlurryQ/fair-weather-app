import '../styles/auth.css';

// TODO one auth component based on URL

export default function SignUp() {
  return (
    <div className="auth">
      <h1>Sign Up</h1>
      <form className="auth">
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="confirm-password" placeholder="Confirm Password" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
