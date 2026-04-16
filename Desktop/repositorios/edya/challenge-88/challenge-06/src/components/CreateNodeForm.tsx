import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { TreeNode, type NodeType } from "../models/TreeNode";
import { useTree } from "../hooks/useTree";

interface FolderOption {
  id: string;
  label: string;
}

const collectFolderOptions = (
  node: TreeNode | null,
  depth = 0
): FolderOption[] => {
  if (!node || node.type !== "folder") {
    return [];
  }

  const prefix = depth === 0 ? "" : `${"  ".repeat(depth)}- `;
  const currentOption = {
    id: node.id,
    label: `${prefix}${node.name}`,
  };

  const childOptions = node.children.flatMap((child) =>
    collectFolderOptions(child, depth + 1)
  );

  return [currentOption, ...childOptions];
};

const CreateNodeForm = () => {
  const { addNode, tree } = useTree();
  const [name, setName] = useState("");
  const [type, setType] = useState<NodeType>("folder");
  const [parentId, setParentId] = useState("root");
  const [error, setError] = useState<string | null>(null);

  const folderOptions = useMemo(() => collectFolderOptions(tree.root), [tree]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Debes escribir un nombre.");
      return;
    }

    setError(null);
    await addNode(parentId, trimmedName, type);
    setName("");
  };

  return (
    <div>
      <p className="home-label">Crear elemento</p>

      <form onSubmit={handleSubmit} className="auth-form create-node-form">
        <div className="form-group">
          <label htmlFor="node-name">Nombre</label>
          <input
            id="node-name"
            placeholder="Ej. documentos"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="node-type">Tipo</label>
          <select
            id="node-type"
            className="form-select"
            value={type}
            onChange={(e) => setType(e.target.value as NodeType)}
          >
            <option value="folder">Carpeta</option>
            <option value="file">Archivo</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="parent-folder">Carpeta padre</label>
          <select
            id="parent-folder"
            className="form-select"
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
          >
            {folderOptions.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.label}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" className="btn btn-primary create-node-button">
          Crear
        </button>
      </form>
    </div>
  );
};

export default CreateNodeForm;
