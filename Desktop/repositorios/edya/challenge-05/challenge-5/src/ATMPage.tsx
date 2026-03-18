import { useState, useEffect } from "react"
import { Queue } from "./models/Queue"
import type { Person } from "./models/Person"
import PersonForm from "./PersonForm"
import PersonList from "./PersonList"


const queue = new Queue<Person>()

export default function ATMPage() {
  const [people, setPeople] = useState<Person[]>([])

  //fecha
  const generateDate = () => {
    return new Date().toLocaleString()
  }


  const addPerson = (person: Omit<Person, "arrivalDate">) => {
    const newPerson: Person = {
      ...person,
      arrivalDate: generateDate()
    }

    queue.enqueue(newPerson)
    setPeople(queue.print())
  }


  useEffect(() => {
  if (!queue.isEmpty()) return  

  queue.enqueue({
    name: "Juan",
    amount: 100,
    arrivalDate: generateDate()
  })

  queue.enqueue({
    name: "Maria",
    amount: 200,
    arrivalDate: generateDate()
  })

  queue.enqueue({
    name: "Carlos",
    amount: 50,
    arrivalDate: generateDate()
  })

  setPeople(queue.print())
}, [])

  return (
    <div>
      <h1>ATM Queue</h1>

      <PersonForm onAdd={addPerson} />

      <PersonList people={people} />
    </div>
  )
}