import { useState } from "react"
import { NavLink } from "react-router-dom"
import type { MenuTreeNode } from "../data/menuTree"

interface MenuItemProps {
  node:  MenuTreeNode
  depth: number
}

// ─── Recursive DFS renderer ───────────────────────────
const MenuItem = ({ node, depth }: MenuItemProps) => {
  const [open, setOpen] = useState(true)
  const hasChildren = node.children.length > 0

  if (hasChildren) {
    return (
      <div className={`menu-group depth-${depth}`}>
        {/* Expandable parent */}
        <button
          className="menu-toggle"
          onClick={() => setOpen(prev => !prev)}
          aria-expanded={open}
        >
          <span className="menu-icon">{node.icon}</span>
          <span className="menu-label">{node.title}</span>
          <span className={`menu-chevron ${open ? "menu-chevron--open" : ""}`}>›</span>
        </button>

        {/* Children — rendered recursively (DFS) */}
        {open && (
          <div className="menu-children" role="group">
            {node.children.map((child, idx) => (
              <MenuItem key={idx} node={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  // Leaf node — renders a NavLink
  return (
    <NavLink
      to={node.path}
      end
      className={({ isActive }) =>
        `menu-link depth-${depth}${isActive ? " menu-link--active" : ""}`
      }
    >
      <span className="menu-icon">{node.icon}</span>
      <span className="menu-label">{node.title}</span>
    </NavLink>
  )
}

export default MenuItem
