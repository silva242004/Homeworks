import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import type { Product } from "../structures/Trie";

const COLLECTION = "products";

export const saveProduct = async (product: Product): Promise<void> => {
  const id = product.name.toLowerCase().replace(/\s+/g, "-");
  await setDoc(doc(db, COLLECTION, id), product);
};

export const getAllProducts = async (): Promise<Product[]> => {
  const snapshot = await getDocs(collection(db, COLLECTION));
  return snapshot.docs.map((d) => d.data() as Product);
};
