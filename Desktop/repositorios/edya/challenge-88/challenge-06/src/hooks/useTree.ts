import { useContext } from "react";
import { TreeContext } from "../context/TreeContextObject";

export const useTree = () => {
  const context = useContext(TreeContext);

  if (!context) {
    throw new Error("error");
  }

  return context;
};
