import { useState } from "react";
import { LinkedList, Node } from "../modelo/LinkedList";

export default function SongsPage() {

  // Creamos la lista
  const songsList = new LinkedList<string>();
  songsList.append("enanos verdes");
  songsList.append("lamento boliviano");
  songsList.append("we are charlie kirk"); 
  songsList.append("la marsellaise");
  songsList.append("red hot chili peppers");
  songsList.append("yonkers");


  // Estado para canción actual
  const [current, setCurrent] = useState<Node<string> | null>(songsList.head);

  const nextSong = () => {
    if (current?.next) {
      setCurrent(current.next);
    }
  };

  return (
    <div>
      <h1>Linked List - Songs</h1>

      <p>Current Song: {current?.value}</p>

      <button onClick={nextSong}>Next Song</button>

      <h3>Playlist:</h3>
      <ul>
        {songsList.print().map((song, index) => (
          <li key={index}>{song}</li>
        ))}
      </ul>

      <p>Total songs: {songsList.size()}</p>
    </div>
  );
}