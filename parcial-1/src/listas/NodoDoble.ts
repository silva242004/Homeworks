export class NodoDoble {

  valor: string
  siguiente: NodoDoble | null
  anterior: NodoDoble | null

  constructor(valor: string) {
    this.valor = valor
    this.siguiente = null
    this.anterior = null
  }

}