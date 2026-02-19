import type { Contact } from "./types";


interface Props {
  contact: Contact;
  deleteContact: (id: number) => void;
}

function ContactItem({ contact, deleteContact }: Props) {
  return (
    <li>
      {contact.name} - {contact.phone}
      <button onClick={() => deleteContact(contact.id)}>
        Delete
      </button>
    </li>
  );
}

export default ContactItem;

