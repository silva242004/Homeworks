import { useState } from "react"
import { ListaCircularDoble } from "./listas/ListaCircularDoble"

interface Props {
  listaInversionistas: ListaCircularDoble
}

export default function Inversionistas({ listaInversionistas }: Props) {

  const [actual, setActual] = useState(listaInversionistas.actual?.valor)

  function siguiente() {
    const nuevo = listaInversionistas.siguiente()
    setActual(nuevo)
  }

  function anterior() {
    const nuevo = listaInversionistas.anterior()
    setActual(nuevo)
  }

  return (
    <div>

      <h2>Inversionistas</h2>

      <p>{actual}</p>

      <button onClick={anterior}>Anterior</button>
      <button onClick={siguiente}>Siguiente</button>

    </div>
  )

}