import { useState } from "react"
import VehiculosDisponibles from "./VehiculosDisponibles"
import HistorialAlquiler from "./HistorialAlquiler"
import VehiculoDestacado from "./VehiculoDestacado"
import Inversionistas from "./Inversionistas"
import { ListaEnlazada } from "./listas/ListaEnlazada"
import { ListaDoble } from "./listas/ListaDoble"
import { ListaCircular } from "./listas/ListaCircular"
import { ListaCircularDoble } from "./listas/ListaCircularDoble"

// listas
const disponibles = new ListaEnlazada()
const historial = new ListaDoble()
const destacados = new ListaCircular()
const inversionistas = new ListaCircularDoble()

disponibles.append("Tesla Model 3")
disponibles.append("tesla Model Y")
disponibles.append("tesla Model X")
disponibles.append("cybertruck")
disponibles.append("Xiaomi SU7 Ultra")  
disponibles.append("Xiaomi YU7 Pro")
disponibles.append("Xiaomi17Pro")
disponibles.append("BYD Seal")
disponibles.append("BYD Dolphin")

destacados.append("Xiaomi")
destacados.append("BYD")
destacados.append("Tesla")

inversionistas.append("krisR")
inversionistas.append("AlexP")
inversionistas.append("ecopetrol")
inversionistas.append("nutresa")
inversionistas.append("nestle")
inversionistas.append("monsanto")
inversionistas.append("shell")
inversionistas.append("vidrios y aluminios del norte")

export default function App() {

  const [historialLista, setHistorialLista] = useState<string[]>([])

  function alquilarVehiculo(nombre: string) {
    disponibles.remove(nombre)

    historial.append(nombre)
        setHistorialLista(historial.print())

  }

  return (
    <div>

      <h1>GESTION DE VEHICULOS 13</h1>

      <VehiculoDestacado listaDestacados={destacados} />

      <VehiculosDisponibles
        listaDisponibles={disponibles}
        alquilarVehiculo={alquilarVehiculo}
      />

      <HistorialAlquiler registros={historialLista} />

      <Inversionistas listaInversionistas={inversionistas} />

    </div>
  )

}