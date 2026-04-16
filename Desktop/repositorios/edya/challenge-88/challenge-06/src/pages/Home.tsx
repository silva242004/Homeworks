import CreateNodeForm from "../components/CreateNodeForm";
import TreeView from "../components/TreeView";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTree } from "../hooks/useTree";

const Home = () => {
  const { user, logout } = useAuthContext();
  const { tree } = useTree();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <main className="home-container">
      <section className="home-hero">
        <div className="home-header">
          <div>
            <p className="home-eyebrow">Home</p>
            <h1 className="home-title">Gestor de Archivos</h1>
          </div>

          
        </div>

        <div className="home-card">
          <p className="home-label">Usuario</p>
          <p className="home-email">{user?.email}</p>
          <div className="home-card-actions">
            <button className="btn btn-logout" onClick={handleLogout}>
              Cerrar sesion
            </button>
          </div>
        </div>

        <div className="node-form-card">
          <CreateNodeForm />
        </div>

        <div className="tree-section">
          {!tree?.root ? (
            <p>Cargando arbol...</p>
          ) : (
            <TreeView node={tree.root} />
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;
