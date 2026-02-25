import { useState } from "react";
import { DoublyLinkedList, DoublyNode } from "../modelo/DoublyLinkedList";

export default function BrowserPage() {

  const history = new DoublyLinkedList<string>();

  history.append("fk data.com");
  history.append("fake.com");
  history.append("data.com"); 
  history.append("pizza.com");
 
 

  const [current, setCurrent] = useState<DoublyNode<string> | null>(history.head);

  const goNext = () => {
    if (current?.next) {
      setCurrent(current.next);
    }
  };

  const goBack = () => {
    if (current?.previous) {
      setCurrent(current.previous);
    }
  };

  return (
    <div>
      <h1>Doubly Linked List - Browser</h1>

      <p>Current Page: {current?.value}</p>

      <button onClick={goBack}>Back</button>
      <button onClick={goNext}>Next</button>

      <p>Total pages: {history.size()}</p>
    </div>
  );
}