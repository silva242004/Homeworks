import { useEffect, useRef, useState } from "react"
import Tree from "react-d3-tree"
import { BinaryTree } from "../data/BinaryTree"
import type { RD3Node } from "../data/BinaryTree"

// ─── Build initial tree ───────────────────────────────
const buildTree = (): BinaryTree => {
  const t = new BinaryTree()
  t.insert(10)
  t.insert(5)
  t.insert(15)
  t.insert(3)
  t.insert(7)
  t.insert(12)
  t.insert(20)
  return t
}

// ─── TreePage ─────────────────────────────────────────
const TreePage = () => {
  const [tree,         setTree]         = useState<BinaryTree>(buildTree)
  const [d3Data,       setD3Data]       = useState<RD3Node | null>(null)
  const [insertVal,    setInsertVal]    = useState("")
  const [searchVal,    setSearchVal]    = useState("")
  const [searchResult, setSearchResult] = useState<boolean | null>(null)
  const [translate,    setTranslate]    = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // ── Console tests + sync visualization on tree change ─
  useEffect(() => {
    console.group("🌳 Binary Tree — console tests")

    console.log("INORDER:")
    tree.inorder()

    console.log("PREORDER:")
    tree.preorder()

    console.log("POSTORDER:")
    tree.postorder()

    console.log("SEARCH 7:",  tree.contains(7))
    console.log("SEARCH 20:", tree.contains(20))

    console.groupEnd()

    setD3Data(tree.convertTreeToD3())
  }, [tree])

  // ── Center tree inside its container ─────────────────
  useEffect(() => {
    if (containerRef.current) {
      setTranslate({
        x: containerRef.current.offsetWidth / 2,
        y: 60,
      })
    }
  }, [d3Data])

  // ── Insert ────────────────────────────────────────────
  const handleInsert = () => {
    const n = parseInt(insertVal, 10)
    if (isNaN(n)) return

    // Preserve existing structure: rebuild from preorder + append new value
    const order = tree.toPreorderArray()
    const next  = new BinaryTree()
    ;[...order, n].forEach(v => next.insert(v))

    setTree(next)
    setInsertVal("")
    setSearchResult(null)
    console.log(`Inserted ${n} — sorted:`, next.toSortedArray())
  }

  // ── Search ────────────────────────────────────────────
  const handleSearch = () => {
    const n = parseInt(searchVal, 10)
    if (!isNaN(n)) {
      const found = tree.contains(n)
      setSearchResult(found)
      console.log(`SEARCH ${n}:`, found)
    }
  }

  return (
    <div className="page-content">
      <h1 className="page-title">🌳 Binary Tree (BST)</h1>
      <p className="page-subtitle">
        Traversals are printed to the browser console on every change.
      </p>

      {/* ── Traversal display ─────────────────────────── */}
      <div className="bst-traversals">
        <div className="bst-traversal-card">
          <h3>Inorder</h3>
          <p className="bst-order-desc">Left → Root → Right</p>
          <p className="bst-order-result">
            {tree.toSortedArray().join(" → ")}
          </p>
        </div>
        <div className="bst-traversal-card">
          <h3>Preorder</h3>
          <p className="bst-order-desc">Root → Left → Right</p>
          <p className="bst-order-result bst-order-result--pre">
            {tree.toPreorderArray().join(" → ")}
          </p>
        </div>
        <div className="bst-traversal-card">
          <h3>Postorder</h3>
          <p className="bst-order-desc">Left → Right → Root</p>
          <p className="bst-order-result bst-order-result--post">
            {tree.toPostorderArray().join(" → ")}
          </p>
        </div>
      </div>

      {/* ── Controls ──────────────────────────────────── */}
      <div className="bst-controls">
        <div className="bst-control-group">
          <label>Insertar valor</label>
          <div className="bst-input-row">
            <input
              type="number"
              value={insertVal}
              placeholder="ej. 8"
              className="bst-input"
              onChange={e => setInsertVal(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleInsert()}
            />
            <button className="btn btn-primary bst-btn" onClick={handleInsert}>
              Insertar
            </button>
          </div>
        </div>

        <div className="bst-control-group">
          <label>Buscar valor</label>
          <div className="bst-input-row">
            <input
              type="number"
              value={searchVal}
              placeholder="ej. 7"
              className="bst-input"
              onChange={e => { setSearchVal(e.target.value); setSearchResult(null) }}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
            />
            <button className="btn btn-primary bst-btn" onClick={handleSearch}>
              Buscar
            </button>
          </div>
          {searchResult !== null && (
            <p className={`bst-search-result ${searchResult ? "bst-search-result--found" : "bst-search-result--missing"}`}>
              {searchResult
                ? `✅ ${searchVal} encontrado en el árbol`
                : `❌ ${searchVal} no existe en el árbol`}
            </p>
          )}
        </div>
      </div>

      {/* ── react-d3-tree visualization ────────────────── */}
      {d3Data && (
        <div className="bst-viz">
          <h2 className="bst-viz-title">
            Visualización
            <span className="bst-viz-meta">
              altura {tree.height()} · {tree.toSortedArray().length} nodos
            </span>
          </h2>

          <div className="bst-tree-container" ref={containerRef}>
            <Tree
              data={d3Data}
              orientation="vertical"
              translate={translate}
              pathFunc="straight"
              nodeSize={{ x: 80, y: 90 }}
              separation={{ siblings: 1.2, nonSiblings: 1.4 }}
              renderCustomNodeElement={({ nodeDatum }) => (
                <g>
                  <circle r={22} fill="#6c63ff" />
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#fff"
                    fontSize={13}
                    fontWeight="bold"
                  >
                    {nodeDatum.name}
                  </text>
                </g>
              )}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default TreePage
