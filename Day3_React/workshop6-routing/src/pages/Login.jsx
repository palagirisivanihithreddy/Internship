import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {

  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/dashboard");
  };

  return (

    <div className="login-container">

      <div className="login-card">

        <h1>ACTORYX</h1>

        <h3>Employee Portal Login</h3>

        <input
          type="text"
          placeholder="Username"
          className="login-input"
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
        />

        <button
          className="login-btn"
          onClick={handleLogin}
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default Login;