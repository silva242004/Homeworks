// ─── Internal node ────────────────────────────────────
class BSTNode {
  value: number
  left:  BSTNode | null = null
  right: BSTNode | null = null

  constructor(value: number) {
    this.value = value
  }
}

// ─── react-d3-tree compatible shape ──────────────────
export interface RD3Node {
  name:       string
  children?:  RD3Node[]
}

// ─── Binary Search Tree ───────────────────────────────
export class BinaryTree {
  root: BSTNode | null = null

  // ── Insert (recursive) ─────────────────────────────
  insert(value: number): void {
    if (this.root === null) {
      this.root = new BSTNode(value)
    } else {
      this._insert(this.root, value)
    }
  }

  private _insert(node: BSTNode, value: number): void {
    if (value < node.value) {
      if (node.left === null) node.left = new BSTNode(value)
      else this._insert(node.left, value)
    } else {
      if (node.right === null) node.right = new BSTNode(value)
      else this._insert(node.right, value)
    }
  }

  // ── Search (recursive DFS) ─────────────────────────
  contains(value: number): boolean {
    return this._contains(this.root, value)
  }

  private _contains(node: BSTNode | null, value: number): boolean {
    if (node === null)        return false
    if (value === node.value) return true
    return value < node.value
      ? this._contains(node.left,  value)
      : this._contains(node.right, value)
  }

  // ── Inorder  — Left → Root → Right (ascending) ─────
  inorder(): void {
    this._inorder(this.root)
  }

  private _inorder(node: BSTNode | null): void {
    if (node === null) return
    this._inorder(node.left)
    console.log(node.value)
    this._inorder(node.right)
  }

  // ── Preorder — Root → Left → Right ─────────────────
  preorder(): void {
    this._preorder(this.root)
  }

  private _preorder(node: BSTNode | null): void {
    if (node === null) return
    console.log(node.value)
    this._preorder(node.left)
    this._preorder(node.right)
  }

  // ── Postorder — Left → Right → Root ────────────────
  postorder(): void {
    this._postorder(this.root)
  }

  private _postorder(node: BSTNode | null): void {
    if (node === null) return
    this._postorder(node.left)
    this._postorder(node.right)
    console.log(node.value)
  }

  // ── Height ──────────────────────────────────────────
  height(): number {
    const h = (n: BSTNode | null): number =>
      n === null ? 0 : 1 + Math.max(h(n.left), h(n.right))
    return h(this.root)
  }

  // ── Sorted array (inorder, no side effects) ─────────
  toSortedArray(): number[] {
    const out: number[] = []
    const go = (n: BSTNode | null) => {
      if (!n) return
      go(n.left)
      out.push(n.value)
      go(n.right)
    }
    go(this.root)
    return out
  }

  // ── Preorder array (no side effects) ────────────────
  toPreorderArray(): number[] {
    const out: number[] = []
    const go = (n: BSTNode | null) => {
      if (!n) return
      out.push(n.value)
      go(n.left)
      go(n.right)
    }
    go(this.root)
    return out
  }

  // ── Postorder array (no side effects) ───────────────
  toPostorderArray(): number[] {
    const out: number[] = []
    const go = (n: BSTNode | null) => {
      if (!n) return
      go(n.left)
      go(n.right)
      out.push(n.value)
    }
    go(this.root)
    return out
  }

  // ── Convert to react-d3-tree format ─────────────────
  convertTreeToD3(node: BSTNode | null = this.root): RD3Node | null {
    if (node === null) return null

    const result: RD3Node = { name: String(node.value) }
    const children: RD3Node[] = []

    const left  = this.convertTreeToD3(node.left)
    const right = this.convertTreeToD3(node.right)

    if (left)  children.push(left)
    if (right) children.push(right)
    if (children.length > 0) result.children = children

    return result
  }
}
