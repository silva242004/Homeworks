import { useContext } from "react";
import { AuthContext } from "../Context";
import { useNavigate } from "react-router-dom";

const StackPage = () => {
  const auth = useContext(AuthContext)!;
  const navigate = useNavigate();

  return (
    <div>
      <h2>Stack Page</h2>
      <p>Bienvenido {auth?.user}</p>

      <button onClick={() => navigate("/queue")}>
        Ir a Queue
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

export default StackPage;