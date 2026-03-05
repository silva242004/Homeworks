import { Nodo } from "./nodo"

export class ListaEnlazada {

  cabeza: Nodo | null
  longitud: number

  constructor() {
    this.cabeza = null
    this.longitud = 0
  }

  append(valor: string) {

    const nuevo = new Nodo(valor)

    if (!this.cabeza) {
      this.cabeza = nuevo
    } else {

      let actual = this.cabeza

      while (actual.siguiente) {
        actual = actual.siguiente
      }

      actual.siguiente = nuevo
    }

    this.longitud++
  }

  remove(valor: string) {

    if (!this.cabeza) return

    if (this.cabeza.valor === valor) {
      this.cabeza = this.cabeza.siguiente
      this.longitud--
      return
    }

    let actual = this.cabeza

    while (actual.siguiente && actual.siguiente.valor !== valor) {
      actual = actual.siguiente
    }

    if (actual.siguiente) {
      actual.siguiente = actual.siguiente.siguiente
      this.longitud--
    }

  }

  print() {

    let actual = this.cabeza
    const valores = []

    while (actual) {
      valores.push(actual.valor)
      actual = actual.siguiente
    }

    return valores
  }

}