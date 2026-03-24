import { useContext } from "react";
import { AuthContext } from "../Context";
import { useNavigate } from "react-router-dom";

const QueuePage = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div>
      <h2>Queue Page</h2>
      <p>Bienvenido {auth?.user}</p>

      <button onClick={() => navigate("/stack")}>
        Ir a Stack
      </button>

      <button
        onClick={() => {
          auth?.logout();
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default QueuePage;