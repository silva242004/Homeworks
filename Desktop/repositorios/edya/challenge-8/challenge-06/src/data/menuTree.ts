import type { ComponentType } from "react"

// ─── N-ary Tree Node ───────────────────────────────────
export interface MenuTreeNode {
  title:     string
  path:      string
  icon:      string
  component: ComponentType
  children:  MenuTreeNode[]
}

// ─── Tree class (N-ary) ───────────────────────────────
export class NaryTreeNode implements MenuTreeNode {
  title:     string
  path:      string
  icon:      string
  component: ComponentType
  children:  NaryTreeNode[]

  constructor(title: string, path: string, icon: string, component: ComponentType) {
    this.title     = title
    this.path      = path
    this.icon      = icon
    this.component = component
    this.children  = []
  }

  /** Add one child and return `this` for chaining */
  addChild(node: NaryTreeNode): this {
    this.children.push(node)
    return this
  }

  /** DFS — yields every node in pre-order */
  *[Symbol.iterator](): Generator<NaryTreeNode> {
    yield this
    for (const child of this.children) yield* child
  }
}

// ─── Flatten helper (DFS pre-order) ──────────────────
export const flattenTree = (node: MenuTreeNode): MenuTreeNode[] => {
  return [node, ...node.children.flatMap(flattenTree)]
}

// ─── Lazy component imports ───────────────────────────
// Resolved at runtime — avoids circular-dep issues
import Dashboard from "../pages/Dashboard"
import Tasks     from "../pages/Tasks"
import Profile   from "../pages/Profile"
import Settings  from "../pages/Settings"
import Account   from "../pages/Account"
import Security  from "../pages/Security"
import TreePage  from "../pages/TreePage"

// ─── Build the menu tree ──────────────────────────────
//
//  Dashboard
//  ├── Tasks
//  ├── Profile
//  ├── Arbol  (/dashboard/arbol)
//  └── Settings
//       ├── Account
//       └── Security

const settingsNode = new NaryTreeNode("Settings",  "/settings",          "⚙️",  Settings)
settingsNode.addChild(new NaryTreeNode("Account",  "/settings/account",  "👤",  Account))
settingsNode.addChild(new NaryTreeNode("Security", "/settings/security", "🔒",  Security))

const menuTree = new NaryTreeNode("Dashboard", "/dashboard",       "🏠", Dashboard)
menuTree.addChild(new NaryTreeNode("Tasks",    "/tasks",           "✅", Tasks))
menuTree.addChild(new NaryTreeNode("Profile",  "/profile",         "👤", Profile))
menuTree.addChild(new NaryTreeNode("Arbol",    "/dashboard/arbol", "🌳", TreePage))
menuTree.addChild(settingsNode)

export default menuTree
