import { useState } from "react"
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  QueryConstraint,
  DocumentData,
} from "firebase/firestore"
import { db } from "../firebase/config"

// ─── Tipos ────────────────────────────────────────────
export interface FirestoreDoc {
  id: string
  [key: string]: any
}

type Filter  = [string, "==" | "!=" | "<" | "<=" | ">" | ">=" , any]
type OrderBy = [string, "asc" | "desc"]

interface UseCollectionReturn {
  data:    FirestoreDoc[]
  loading: boolean
  error:   string | null
  getAll:  (filters?: Filter[], order?: OrderBy) => Promise<void>
  add:     (newData: DocumentData) => Promise<string | null>
  update:  (id: string, newData: Partial<DocumentData>) => Promise<void>
  remove:  (id: string) => Promise<void>
}

// ─── Hook ─────────────────────────────────────────────
const useCollection = (collectionName: string): UseCollectionReturn => {
  const [data,    setData]    = useState<FirestoreDoc[]>([])
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  // ── GET ALL ───────────────────────────────────────
  const getAll = async (
    filters: Filter[]   = [],
    order:   OrderBy | undefined = undefined
  ): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      const constraints: QueryConstraint[] = []

      filters.forEach(([field, op, val]) => {
        constraints.push(where(field, op, val))
      })

      if (order) {
        constraints.push(orderBy(order[0], order[1]))
      }

      const q    = query(collection(db, collectionName), ...constraints)
      const snap = await getDocs(q)
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }))

      setData(list)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  // ── ADD ───────────────────────────────────────────
  const add = async (newData: DocumentData): Promise<string | null> => {
    setError(null)
    try {
      const docRef = await addDoc(collection(db, collectionName), newData)
      await getAll()
      return docRef.id
    } catch (e: any) {
      setError(e.message)
      return null
    }
  }

  // ── UPDATE ────────────────────────────────────────
  const update = async (
    id:      string,
    newData: Partial<DocumentData>
  ): Promise<void> => {
    setError(null)
    try {
      const docRef = doc(db, collectionName, id)
      await updateDoc(docRef, newData)
      await getAll()
    } catch (e: any) {
      setError(e.message)
    }
  }

  // ── REMOVE ────────────────────────────────────────
  const remove = async (id: string): Promise<void> => {
    setError(null)
    try {
      const docRef = doc(db, collectionName, id)
      await deleteDoc(docRef)
      await getAll()
    } catch (e: any) {
      setError(e.message)
    }
  }

  return { data, loading, error, getAll, add, update, remove }
}

export default useCollection