const KEY_CATEGORIA="1"
const KEY_DIFICULTAD="easy"
const KEY_RESPUESTA ="boolean"
//const apiUrl = `https://opentdb.com/api.php?amount=10&category=${KEY_CATEGORIA}&difficulty=${KEY_DIFICULTAD}&type=${KEY_RESPUESTA}`
const apiUrl = `https://opentdb.com/api.php?amount=10`

export function saludar() {
    console.log("Hola soy Alejandra Cubides");
  }

/*INGRESANDO TODAS LAS OPCIONES
export async function obtenerRespuestas(categoria,dificultad,respuesta) {
    let resultado = await fetch(apiUrl + `&s=${categoria}`+ `&s=${dificultad}`+ `&s=${respuesta}`) 
    let objResultado =await resultado.json();
    return objResultado;
}*/

/*export async function obtenerRespuestas() {
    let resultado = await fetch(apiUrl) 
    let objResultado =await resultado.json();
    console.log(objResultado.next);
    
    let arregloDePreguntas=[];

    for (let i = 0; i < objResultado.results.length; i++) {
        const pregunta = objResultado.results[i];
    
         console.log("Pregunta que estamos iterando:", pregunta.url);
        let preguntaData = await fetch(pregunta.url); //https://pokeapi.co/api/v2/pokemon/1/
        let ppreguntaParseado = await preguntaData.json(); // {}.
    
        let preguntaFormateada = {
            pregunta: preguntaFormateada.question, //"string"
            categoria: preguntaFormateada.category, //"string"
            respuesta_correcta: preguntaFormateada.correct_answer, //"string"
            dificultad: preguntaFormateada.difficulty, // "string"
            respuesta_incorrecta: preguntaFormateada.incorrect_answers, //"string"          
            tipo_respuesta: preguntaFormateada.type, //"string"
        };
        console.log(preguntaFormateada);
        arregloDePreguntas.push(console.log(preguntaFormateada));
    }
return {
    previous: objResultado.previous,
    next: objResultado.next,
    arregloDePreguntas: arregloDePreguntas, //[{id,nombre, tipos, img},{},{}]
  };
} */

export async function obtenerRespuestas() {
    let resultado = await fetch(apiUrl) 
    let objResultado =await resultado.json();
   // console.log(objResultado.next);    
    return objResultado;
}