# SpotifyEDU — Mini plataforma musical con estructuras de datos

Proyecto educativo inspirado en Spotify, desarrollado con **React + Vite + TypeScript** y estructuras de datos avanzadas implementadas desde cero: **Trie**, **Max Heap** y **Graph**.

---

## Instalación

```bash
npm install
npm run dev
```

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run preview` | Previsualización del build |

---

## Arquitectura

```
src/
├── interfaces/         → Tipos e interfaces globales (Song, SongsContextValue)
├── structures/         → Clases de estructuras de datos puras (sin React)
│   ├── Trie.ts
│   ├── MaxHeap.ts
│   └── SongGraph.ts
├── data/               → Mock data de 20 canciones reales
├── hooks/              → Hooks reutilizables que encapsulan las estructuras
│   ├── useTrie.ts
│   ├── useHeap.ts
│   ├── useGraph.ts
│   ├── useFavorites.ts
│   └── useSongs.ts
├── context/            → Context API: SongsContext + SongsProvider
├── router/             → Configuración de rutas con React Router
├── pages/              → Home, Search, Rankings, Recommendations, Favorites, NotFound
├── components/         → Sidebar, SongCard, SearchBar, RankingItem
└── styles/             → SCSS modular (abstracts, base, layout, components, pages)
```

### Principio de separación

- Las **estructuras** (`structures/`) son clases TypeScript puras — no saben que React existe.
- Los **hooks** (`hooks/`) instancian las estructuras con `useRef` y exponen una API reactiva.
- El **contexto** (`context/`) orquesta los hooks y expone solo lo que la UI necesita.
- Los **componentes** consumen el contexto y no contienen ninguna lógica de estructuras.

---

## Estructuras de datos

### Trie — Buscador predictivo

El Trie es un árbol donde cada nodo representa un carácter. Permite búsqueda de prefijos en O(m), donde m es la longitud del prefijo.

```
insert("Blinding Lights")
→ root → 'b' → 'l' → 'i' → 'n' → ... → isEndOfWord=true, song={...}

getSuggestionsByPrefix("bl")
→ navega hasta 'l', luego hace DFS y recolecta todas las canciones marcadas
```

- `TrieNode`: tiene `children: Map<string, TrieNode>`, `isEndOfWord`, y `song`
- `insert()`: normaliza a minúsculas, inserta carácter a carácter
- `search()`: busca coincidencia exacta
- `getSuggestionsByPrefix()`: DFS desde el nodo del último carácter del prefijo

**Usado en:** página `/search` con búsqueda en tiempo real.

---

### Max Heap — Ranking de popularidad

El Max Heap es un árbol binario completo donde el nodo raíz siempre tiene el valor máximo. Se implementa con un arreglo.

```
Índice del padre de i:  Math.floor((i - 1) / 2)
Hijo izquierdo de i:    2 * i + 1
Hijo derecho de i:      2 * i + 2
```

- `push()`: inserta al final y hace `percolateUp`
- `pop()`: extrae la raíz, pone el último elemento arriba y hace `percolateDown`
- `toArray()`: retorna una copia ordenada de mayor a menor sin mutar la estructura
- Genérico `MaxHeap<T>` con comparador — reutilizable para cualquier tipo

**Usado en:** página `/rankings` mostrando las 10 canciones más populares.

---

### Graph — Recomendaciones

Grafo no dirigido implementado con lista de adyacencia (`Map<string, Set<string>>`).

```
addEdge("s1", "s2") → adjacencyList["s1"].add("s2")
                    → adjacencyList["s2"].add("s1")  ← no dirigido

getRecommendations("s1")
→ obtiene vecinos directos de s1
→ luego obtiene vecinos de cada vecino (2 niveles)
→ excluye s1 y sus vecinos directos → recomendaciones de segundo grado
```

- `addNode()`: registra el nodo en `nodes` y `adjacencyList`
- `addEdge()`: bidireccional — agrega en ambas direcciones
- `getNeighbors()`: retorna canciones directamente conectadas
- `getRecommendations()`: retorna canciones conectadas a 2 niveles

**Usado en:** página `/recommendations` donde se selecciona una canción y aparecen sugerencias relacionadas.

---

## Rutas

| Ruta | Descripción |
|---|---|
| `/` | Dashboard con estadísticas y top 5 |
| `/search` | Búsqueda predictiva con Trie |
| `/rankings` | Ranking completo ordenado por Max Heap |
| `/recommendations` | Recomendaciones por Graph |
| `/favorites` | Lista de favoritos del usuario |
| `*` | Página 404 |

---

## Tecnologías

- React 18 + Vite
- TypeScript estricto (sin `any`)
- React Router v7
- Context API + Custom Hooks
- Sass / SCSS modular
- Programación Orientada a Objetos

---

## Autor

Desarrollado para la asignatura **Estructuras de Datos y Algoritmos** — UAO.
