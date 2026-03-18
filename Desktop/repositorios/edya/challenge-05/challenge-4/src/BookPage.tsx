import { useState, useEffect } from "react"
import { Stack } from "./models/Stacks"
import type { Book } from "./models/Book"
import BookForm from "./BookForm"
import BookList from "./BookList"


const stack = new Stack<Book>()

export default function BookPage() {
  const [books, setBooks] = useState<Book[]>([])


  const addBook = (book: Book) => {
    stack.push(book)
    setBooks(stack.print())
  }

  
  useEffect(() => {
    if (!stack.isEmpty()) return 
    stack.push({
      name: "GABO",
      isbn: "123",
      author: "Gabriel García Márquez",
      editorial: "Sudamericana"
    })

    stack.push({
      name: "farenheit 451",
      isbn: "456",
      author: "Ray Bradbury",
      editorial: "Sudamericana"
    })

    setBooks(stack.print())
  }, [])

  return (
    <div>
      <h1>Books Stack</h1>

      <BookForm onAdd={addBook} />

      <BookList books={books} />
    </div>
  )
}