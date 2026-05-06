import { useState } from "react";
import CreateNodeForm from "../components/CreateNodeForm";
import TreeView from "../components/TreeView";
import GraphView from "../components/GraphView";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTree } from "../hooks/useTree";
import type { Product } from "../structures/Trie";

const Home = () => {
  const { user, logout } = useAuthContext();
  const {
    tree,
    graphNodes,
    graphEdges,
    createCity,
    createPerson,
    getPeopleByCity,
    addProduct,
    searchProducts,
  } = useTree();

  // ── Graph state ───────────────────────────────────────
  const [cityName, setCityName] = useState("");
  const [personName, setPersonName] = useState("");
  const [personAge, setPersonAge] = useState("");
  const [selectedCityForPerson, setSelectedCityForPerson] = useState("");
  const [selectedCityForQuery, setSelectedCityForQuery] = useState("");
  const [graphError, setGraphError] = useState("");

  // ── Search engine state ───────────────────────────────
  const [productName, setProductName] = useState("");
  const [productPopularity, setProductPopularity] = useState("");
  const [searchPrefix, setSearchPrefix] = useState("");
  const [searchK, setSearchK] = useState("3");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searchError, setSearchError] = useState("");
  const [searched, setSearched] = useState(false);

  const cities = graphNodes.filter((n) => n.type === "city");
  const peopleInSelectedCity = selectedCityForQuery
    ? getPeopleByCity(selectedCityForQuery)
    : [];

  // ── Handlers ─────────────────────────────────────────
  const handleLogout = async () => { await logout(); };

  const handleCreateCity = async (e: React.FormEvent) => {
    e.preventDefault();
    setGraphError("");
    if (!cityName.trim()) return;
    try {
      await createCity(cityName.trim());
      setCityName("");
    } catch {
      setGraphError("Error al crear la ciudad");
    }
  };

  const handleCreatePerson = async (e: React.FormEvent) => {
    e.preventDefault();
    setGraphError("");
    if (!personName.trim() || !personAge || !selectedCityForPerson) {
      setGraphError("Completa todos los campos");
      return;
    }
    try {
      await createPerson(personName.trim(), parseInt(personAge, 10), selectedCityForPerson);
      setPersonName("");
      setPersonAge("");
      setSelectedCityForPerson("");
    } catch {
      setGraphError("Error al crear la persona");
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError("");
    const pop = parseInt(productPopularity, 10);
    if (!productName.trim()) { setSearchError("El nombre es obligatorio"); return; }
    if (isNaN(pop) || pop < 0) { setSearchError("La popularidad debe ser un número >= 0"); return; }
    try {
      await addProduct(productName.trim(), pop);
      setProductName("");
      setProductPopularity("");
    } catch {
      setSearchError("Error al guardar el producto");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError("");
    const k = parseInt(searchK, 10);
    if (!searchPrefix.trim()) { setSearchError("Ingresa un prefijo para buscar"); return; }
    if (isNaN(k) || k <= 0) { setSearchError("K debe ser un número mayor a 0"); return; }
    const results = searchProducts(searchPrefix, k);
    setSearchResults(results);
    setSearched(true);
  };

  return (
    <main className="home-container">
      {/* ── Tree Section ─────────────────────────────────── */}
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
          {!tree?.root ? <p>Cargando arbol...</p> : <TreeView node={tree.root} />}
        </div>
      </section>

      {/* ── Graph Section ────────────────────────────────── */}
      <section className="graph-section">
        <div className="graph-section-header">
          <h2 className="graph-title">Grafo: Personas y Ciudades</h2>
          <p className="graph-subtitle">
            Grafo dirigido con lista de adyacencia — Persona → Ciudad
          </p>
        </div>

        {graphError && <p className="graph-error">{graphError}</p>}

        <div className="graph-forms">
          {/* Create City */}
          <div className="graph-form-card">
            <h3 className="graph-form-title">Crear Ciudad</h3>
            <form onSubmit={handleCreateCity} className="graph-form">
              <input
                type="text"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                placeholder="Nombre de la ciudad"
                className="graph-input"
              />
              <button type="submit" className="btn btn-graph-primary">
                Crear ciudad
              </button>
            </form>
          </div>

          {/* Create Person */}
          <div className="graph-form-card">
            <h3 className="graph-form-title">Crear Persona</h3>
            <form onSubmit={handleCreatePerson} className="graph-form">
              <input
                type="text"
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
                placeholder="Nombre"
                className="graph-input"
              />
              <input
                type="number"
                value={personAge}
                onChange={(e) => setPersonAge(e.target.value)}
                placeholder="Edad"
                className="graph-input"
                min="0"
              />
              <select
                value={selectedCityForPerson}
                onChange={(e) => setSelectedCityForPerson(e.target.value)}
                className="graph-input"
              >
                <option value="">Selecciona una ciudad</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))}
              </select>
              <button type="submit" className="btn btn-graph-primary">
                Crear persona
              </button>
            </form>
          </div>

          {/* People by City */}
          <div className="graph-form-card">
            <h3 className="graph-form-title">Personas por Ciudad</h3>
            <select
              value={selectedCityForQuery}
              onChange={(e) => setSelectedCityForQuery(e.target.value)}
              className="graph-input"
            >
              <option value="">Selecciona una ciudad</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>{city.name}</option>
              ))}
            </select>
            <select
              className="graph-input graph-input--people"
              size={Math.max(2, peopleInSelectedCity.length) || 2}
              disabled={!selectedCityForQuery}
              value=""
              onChange={() => undefined}
            >
              {!selectedCityForQuery ? (
                <option disabled>Selecciona una ciudad primero</option>
              ) : peopleInSelectedCity.length === 0 ? (
                <option disabled>No hay personas en esta ciudad</option>
              ) : (
                peopleInSelectedCity.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}{p.age !== undefined ? ` — ${p.age} años` : ""}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>

        <GraphView
          nodes={graphNodes}
          edges={graphEdges}
          filterCityId={selectedCityForQuery || null}
        />

        <div className="graph-legend">
          <span className="legend-item legend-city">Ciudad</span>
          <span className="legend-item legend-person">Persona</span>
        </div>
      </section>

      {/* ── Search Engine Section ─────────────────────────── */}
      <section className="search-section">
        <div className="search-section-header">
          <h2 className="search-title">Motor de Búsqueda de Productos</h2>
          <p className="search-subtitle">
            Trie (búsqueda por prefijo) + Max Heap (Top K por popularidad)
          </p>
        </div>

        {searchError && <p className="search-error">{searchError}</p>}

        <div className="search-forms">
          {/* Add Product */}
          <div className="search-form-card">
            <h3 className="search-form-title">Agregar Producto</h3>
            <form onSubmit={handleAddProduct} className="search-form">
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Nombre del producto"
                className="search-input"
              />
              <input
                type="number"
                value={productPopularity}
                onChange={(e) => setProductPopularity(e.target.value)}
                placeholder="Popularidad"
                className="search-input"
                min="0"
              />
              <button type="submit" className="btn btn-search-primary">
                Agregar producto
              </button>
            </form>
          </div>

          {/* Search */}
          <div className="search-form-card">
            <h3 className="search-form-title">Buscar por Prefijo</h3>
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                value={searchPrefix}
                onChange={(e) => setSearchPrefix(e.target.value)}
                placeholder='Prefijo (ej: "air")'
                className="search-input"
              />
              <input
                type="number"
                value={searchK}
                onChange={(e) => setSearchK(e.target.value)}
                placeholder="K (top resultados)"
                className="search-input"
                min="1"
              />
              <button type="submit" className="btn btn-search-primary">
                Buscar
              </button>
            </form>
          </div>

          {/* Results */}
          <div className="search-form-card search-results-card">
            <h3 className="search-form-title">
              Resultados
              {searchResults.length > 0 && (
                <span className="search-results-count">
                  {searchResults.length}
                </span>
              )}
            </h3>
            {!searched ? (
              <p className="search-empty">Realiza una búsqueda para ver resultados.</p>
            ) : searchResults.length === 0 ? (
              <p className="search-empty">
                No se encontraron productos con ese prefijo.
              </p>
            ) : (
              <ol className="search-results-list">
                {searchResults.map((p, i) => (
                  <li key={`${p.name}-${i}`} className="search-result-item">
                    <span className="result-rank">#{i + 1}</span>
                    <span className="result-name">{p.name}</span>
                    <span className="result-popularity">{p.popularity}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
