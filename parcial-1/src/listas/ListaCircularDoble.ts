import { NodoDoble } from "./NodoDoble"

export class ListaCircularDoble {

  cabeza: NodoDoble | null
  actual: NodoDoble | null

  constructor() {
    this.cabeza = null
    this.actual = null
  }

  append(valor: string) {

    const nuevo = new NodoDoble(valor)

    if (!this.cabeza) {

      this.cabeza = nuevo
      nuevo.siguiente = nuevo
      nuevo.anterior = nuevo
      this.actual = nuevo

    } else {

      const ultimo = this.cabeza.anterior!

      ultimo.siguiente = nuevo
      nuevo.anterior = ultimo

      nuevo.siguiente = this.cabeza
      this.cabeza.anterior = nuevo

    }

  }

  siguiente() {

    if (this.actual) {
      this.actual = this.actual.siguiente
    }

    return this.actual?.valor

  }

  anterior() {

    if (this.actual) {
      this.actual = this.actual.anterior
    }

    return this.actual?.valor

  }

}