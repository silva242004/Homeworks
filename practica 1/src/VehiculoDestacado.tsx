import { useEffect, useState } from "react"
import { ListaCircular } from "./listas/ListaCircular"

interface Props {
  listaDestacados: ListaCircular
}

export default function VehiculoDestacado({ listaDestacados }: Props) {

  const [vehiculo, setVehiculo] = useState(listaDestacados.actual?.valor)

  useEffect(() => {

    const intervalo = setInterval(() => {

      const nuevo = listaDestacados.siguiente()
      setVehiculo(nuevo)

    }, 5000)

    return () => clearInterval(intervalo)

  }, [])

  return (
    <div>
      <h2>Vehículo destacado</h2>
      <p>{vehiculo}</p>
    </div>
  )

}
