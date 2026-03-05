import { useState } from "react"
import { ListaEnlazada } from "./listas/ListaEnlazada"

interface Props {
  listaDisponibles: ListaEnlazada
  alquilarVehiculo: (vehiculo: string) => void
}

export default function VehiculosDisponibles({ listaDisponibles, alquilarVehiculo }: Props) {

  const [vehiculos, setVehiculos] = useState(listaDisponibles.print())

  function alquilar(nombre: string) {
    alquilarVehiculo(nombre)
    setVehiculos(listaDisponibles.print())
  }

  return (
    <div>
      <h2>Vehículos disponibles</h2>

      {vehiculos.map((v, i) => (
        <div key={i}>
          {v}
          <button onClick={() => alquilar(v)}>Alquilar</button>
        </div>
      ))}
    </div>
  )

}