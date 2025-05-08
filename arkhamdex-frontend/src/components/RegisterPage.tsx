import { register, login } from "../api/AuthRoutes";
import { useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import { useNavigate } from "react-router";
import API from "../api/api";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(username, password);

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
      console.error("Register error", err);
    }
  };

  return (
    <section>
      <h1>Register:</h1>
      <form onSubmit={handleRegister}>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Make an account</button>
      </form>
    </section>
  );
}
