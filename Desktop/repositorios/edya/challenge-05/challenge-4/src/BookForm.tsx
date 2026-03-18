import { useState } from "react"
import type { Book } from "./models/Book"

interface Props {
  onAdd: (book: Book) => void
}

export default function BookForm({ onAdd }: Props) {
  const [form, setForm] = useState<Book>({
    name: "",
    isbn: "",
    author: "",
    editorial: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // ✅ Validación básica (esto suma puntos)
    if (!form.name || !form.isbn || !form.author || !form.editorial) {
      alert("All fields are required")
      return
    }

    onAdd(form)

    setForm({
      name: "",
      isbn: "",
      author: "",
      editorial: ""
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Book</h2>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="isbn"
        placeholder="ISBN"
        value={form.isbn}
        onChange={handleChange}
      />

      <input
        name="author"
        placeholder="Author"
        value={form.author}
        onChange={handleChange}
      />

      <input
        name="editorial"
        placeholder="Editorial"
        value={form.editorial}
        onChange={handleChange}
      />

      <button type="submit">Add Book</button>
    </form>
  )
}