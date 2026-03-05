import { NodoDoble } from "./NodoDoble"

export class ListaDoble {

  cabeza: NodoDoble | null
  cola: NodoDoble | null

  constructor() {
    this.cabeza = null
    this.cola = null
  }

  append(valor: string) {

    const nuevo = new NodoDoble(valor)

    if (!this.cabeza) {
      this.cabeza = nuevo
      this.cola = nuevo
    } else {

      nuevo.anterior = this.cola

      if (this.cola) {
        this.cola.siguiente = nuevo
      }

      this.cola = nuevo
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