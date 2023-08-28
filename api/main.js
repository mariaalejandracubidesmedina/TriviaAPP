import{
    saludar,
    obtenerRespuestas,
}from "./controllers/controllers.js";


saludar();
/*obtenerRespuestas("9","easy","multiple").then(function(objResultado){
    console.log(objResultado)
});*/
let Dificultad = document.getElementById("Dificultad");
let tipoRespuesta = document.getElementById("tipoRespuesta");
let Categoria = document.getElementById("Categoria");

obtenerRespuestas().then(function(objResultado){
    console.log(objResultado.results)//arreglo de respuestas
  //  let arregloRespuestas = objResultado.results[{category,correct_answer,difficulty,incorrect_answers,question,type}];
    
    let html = "";
    let arrayDePreguntas = [];
    let objetoRespuesta;

    console.log("preguntas:", objResultado.results);
    for (let i = 0; i < objResultado.results.length; i++) {
        const pregunta = objResultado.results[i];
    
        console.log("cantidad de preguntas:", objResultado.results.length);
        console.log("Pregunta que estamos iterando:", pregunta);
        
            let preguntaFormateada = {
                pregunta: pregunta.question, //"string"
                categoria: pregunta.category, //"string"
                respuesta_correcta: pregunta.correct_answer, //"string"
                dificultad: pregunta.difficulty, // "string"
                respuesta_incorrecta: pregunta.incorrect_answers, //"string"          
                tipo_respuesta: pregunta.type, //"string"
            };
        console.log(preguntaFormateada);
        arrayDePreguntas.push(preguntaFormateada);

       arrayDePreguntas.forEach((elemento) => {
        
            let pregunta = `<div class='card'>
                              <span>${elemento.pregunta}</span>
                              <span>${elemento.Categoria}</span>
                              <span>${elemento.respuesta_correcta}</span>
                              <span>${elemento.dificultad}</span>
                              <span>${elemento.respuesta_incorrecta}</span>                              
                              <span>${elemento.tipo_respuesta}</span>                     
                             
                          </div>`;
  
      html += pregunta;

        })
        root.innerHTML = html;
    }   
   
});

