import { Link } from "react-router";
import { useState } from "react";
import { login } from "../api/AuthRoutes";
import { useAuth } from "./contexts/AuthContext";
import { useNavigate } from "react-router";
import API from "../api/api";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(username, password);
      const token = res.data.access_token;

      localStorage.setItem("token", token);

      const userRes = await API.get("/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = userRes.data;

      authLogin({ id: user.id, username: user.username }, token);
      navigate("/");
    } catch (err) {
      console.error("Login failed", err);
    }
  };
  return (
    <section>
      <h1>Log in:</h1>
      <form onSubmit={handleSubmit}>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p>- or - </p>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </form>
    </section>
  );
}
