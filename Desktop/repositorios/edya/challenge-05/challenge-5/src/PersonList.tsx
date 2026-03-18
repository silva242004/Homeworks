import type { Person } from "./models/Person"

interface Props {
  people: Person[]
}

export default function PersonList({ people }: Props) {
  return (
    <div>
     

      {people.length === 0 ? (
        <p>No people in queue</p>
      ) : (
        people.map((person, index) => (
          <div
            key={index}
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "10px"
            }}
          >
            <p><b>Position:</b> {index + 1}</p>
            <p><b>Name:</b> {person.name}</p>
            <p><b>Amount:</b> ${person.amount}</p>
            <p><b>Arrival:</b> {person.arrivalDate}</p>

            {index === 0 && <p> First (HEAD)</p>}
            {index === people.length - 1 && <p> Last (TAIL)</p>}
          </div>
        ))
      )}
    </div>
  )
}