import { Nodo } from "./nodo"

export class ListaCircular {

  cabeza: Nodo | null
  actual: Nodo | null

  constructor() {
    this.cabeza = null
    this.actual = null
  }

  append(valor: string) {

    const nuevo = new Nodo(valor)

    if (!this.cabeza) {

      this.cabeza = nuevo
      nuevo.siguiente = nuevo
      this.actual = nuevo

    } else {

      let temp = this.cabeza

      while (temp.siguiente !== this.cabeza) {
        temp = temp.siguiente!
      }

      temp.siguiente = nuevo
      nuevo.siguiente = this.cabeza

    }

  }

  siguiente() {

    if (this.actual) {
      this.actual = this.actual.siguiente
    }

    return this.actual?.valor

  }

}