import { useEffect, useState } from "react";
import Loader from "./loader";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";


export interface Contact {
  id: number;
  name: string;
  phone: string;
}

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setContacts([
        { id: 1, name: "juan", phone: "12345662584" },
        { id: 2, name: "jose", phone: "76543262654" },
        { id: 3, name: "yo", phone: "3178354727" },
        { id: 4, name: "tu", phone: "76458145432" },
      ]);
      setLoading(false);
    }, 5000);
  }, []);

  const addContact = (name: string, phone: string) => {
    const newContact: Contact = {
      id: Date.now(),
      name,
      phone,
    };

    setContacts([...contacts, newContact]);
  };

  const deleteContact = (id: number) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1>Contact List</h1>
      <ContactForm addContact={addContact} />
      <ContactList contacts={contacts} deleteContact={deleteContact} />
    </div>
  );
}

export default App;
