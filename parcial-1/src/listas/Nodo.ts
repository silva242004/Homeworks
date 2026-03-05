export class Nodo {

  valor: string
  siguiente: Nodo | null

  constructor(valor: string) {
    this.valor = valor
    this.siguiente = null
  }

}