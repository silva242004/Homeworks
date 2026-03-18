import type{ Book } from "./models/Book"

interface Props {
  books: Book[]
}

export default function BookList({ books }: Props) {
  return (
    <div>
      <h2>Books Stack </h2>

      {books.length === 0 ? (
        <p>No books in stack</p>
      ) : (
        books.map((book, index) => (
          <div key={index} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
            <p><b>Position:</b> {index + 1}</p>
            <p><b>Name:</b> {book.name}</p>
            <p><b>ISBN:</b> {book.isbn}</p>
            <p><b>Author:</b> {book.author}</p>
            <p><b>Editorial:</b> {book.editorial}</p>

            {index === 0 && <p>🔝 Top</p>}
          </div>
        ))
      )}
    </div>
  )
}