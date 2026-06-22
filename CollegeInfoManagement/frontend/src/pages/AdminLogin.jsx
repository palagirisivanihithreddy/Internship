import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const login = () => {

    if (
      username === "admin" &&
      password === "admin123"
    ) {

      localStorage.setItem(
        "adminLoggedIn",
        "true"
      );

      navigate("/admin");

    } else {

      alert(
        "Invalid Username or Password"
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#071330",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        style={{
          background: "#15264f",
          padding: "40px",
          borderRadius: "12px",
          width: "400px"
        }}
      >
        <h1
          style={{
            color: "white"
          }}
        >
          Admin Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px"
          }}
        />

        <button
          onClick={login}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
            background: "#2563eb",
            color: "white",
            border: "none"
          }}
        >
          Login
        </button>

      </div>
    </div>
  );
}

export default AdminLogin;