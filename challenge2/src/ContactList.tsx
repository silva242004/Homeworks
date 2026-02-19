import type { Contact } from "./types";
import ContactItem from "./ContactItem";


interface Props {
  contacts: Contact[];
  deleteContact: (id: number) => void;
}

function ContactList({ contacts, deleteContact }: Props) {
  return (
    <ul>
      {contacts.map(contact => (
        <ContactItem
          key={contact.id}
          contact={contact}
          deleteContact={deleteContact}
        />
      ))}
    </ul>
  );
}

export default ContactList;
