function isVaccinend(answer) {
    if (answer.toLowerCase()  === "si") {console.log("la persona esta vacunada")} 
    else if (answer.toLowerCase() === "no") {console.log("la persona no esta vacunada") }
    else {console.log("respuesta no valida, ingresa 'si' o 'no'")}  
    }
    isVaccinend("2 dosis")


const isVaccinend2 = (respuesta) => {
  if (respuesta.toLowerCase() === "si") {console.log("la persona esta vacunada")
  } else if (respuesta.toLowerCase() === "no") {
    console.log("la persona no esta vacunada ❌")
  } else {
    console.log("respuesta no valida,ingresa 'si' o 'no'")
  }
}

isVaccinend2("pfizer")

// Diferencias:
// - Las Regular Functions tienen su propio `this`, pueden usarse como constructor
//   y tienen el objeto `arguments`.
// - Las Arrow Functions tienen sintaxis más corta, no tienen su propio `this`
//   (lo heredan del contexto) y no pueden usarse como constructor.
________________________________________________________________________________
//ejemplo arrow simplificado
//const verificarVacunacion = respuesta =>
  //console.log(
    //respuesta.toLowerCase() === "si"
      // ? "Está vacunado"
      //: respuesta.toLowerCase() === "no"
      // ? "No está vacunado"
      //: "Respuesta no válida"
  //);