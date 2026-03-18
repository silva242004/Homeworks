import { useState } from "react"
import type { Person } from "./models/Person"

interface Props {
  onAdd: (person: Omit<Person, "arrivalDate">) => void
}

export default function PersonForm({ onAdd }: Props) {
  const [form, setForm] = useState({
    name: "",
    amount: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.name || !form.amount) {
      alert("All fields are required")
      return
    }

    onAdd({
      name: form.name,
      amount: Number(form.amount)
    })

    setForm({
      name: "",
      amount: ""
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Person</h2>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="amount"
        placeholder="amount"
        type="number"
        value={form.amount}
        onChange={handleChange}
      />

      <button type="submit">Add to Queue</button>
    </form>
  )
}