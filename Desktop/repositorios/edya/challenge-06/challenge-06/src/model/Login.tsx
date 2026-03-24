import { useState, useContext } from "react";
import { AuthContext } from "../Context";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (auth?.login(email, password)) {
      navigate("/stack");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
