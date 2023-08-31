const _preguntas = document.getElementById('preguntas');
const _opciones = document.querySelector('.trivia-opciones');
const _checkBtn = document.getElementById('check-respuesta');
const _juegoNuevoBtn = document.getElementById('juego-nuevo');
const _resultado = document.getElementById('resultado');
const _puntajecorrecto = document.getElementById('puntajecorrecto');
const _totalpreguntas = document.getElementById('totalpreguntas');

let correctAnswer = "";//preguntas correctas
let correctScore = 0;//respuestas corresctas
let askedCount = 0;//contador
const totalQuestion = 10;//total preguntas

async function loadQuestion() {//leer API
    const APIUrl = 'https://opentdb.com/api.php?amount=10';// urlAPI
    const result = await fetch(APIUrl);
    const { results: [{ question, category, correct_answer, incorrect_answers }] } = await result.json();//traer variables
    _resultado.innerHTML = "";
    showQuestion(question, category, correct_answer, incorrect_answers);
}

function eventListeners() {
    _checkBtn.addEventListener('click', checkAnswer);
    _juegoNuevoBtn.addEventListener('click', restartrivia);
}

document.addEventListener('DOMContentLoaded', function(){
    loadQuestion();
    eventListeners();
    setCount();
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function showQuestion(question, category, correct_answer, incorrect_answers) {
    _checkBtn.disabled = false;
    correctAnswer = HTMLDecode(correct_answer);
    const optionsList = [...incorrect_answers.map(option => HTMLDecode(option)), correctAnswer];//mostrar todas las posibles crepsuestas con al verdadera
    shuffleArray(optionsList);

    _preguntas.innerHTML = `<span>Question:</span>${HTMLDecode(question)} <br> <span class="category">Category : ${HTMLDecode(category)} </span>`;
    _opciones.innerHTML = optionsList.map((option, index) => `
        <li>${index + 1}. <span>${option}</span></li>
    `).join('');
    selectOption();
}


function selectOption() {
    _opciones.querySelectorAll('li').forEach(option => {
        option.addEventListener('click', function() {
            _opciones.querySelector('.selected')?.classList.remove('selected');
            option.classList.add('selected');
        });
    });
}

function checkAnswer() {
    _checkBtn.disabled = true;
    const selectedOption = _opciones.querySelector('.selected');

    if (!selectedOption) {
        _resultado.innerHTML = `<p><i class="fas fa-question"></i> Selecciona una opción</p>`;
        _checkBtn.disabled = false;
        return;
    }

    const selectedAnswer = selectedOption.querySelector('span').textContent;
    if (selectedAnswer === HTMLDecode(correctAnswer)) {
        correctScore++;
        _resultado.innerHTML = `<p><i class="fas fa-check"></i> Respuesta Correcta</p>`;
    } else {
        _resultado.innerHTML = `<p><i class="fas fa-times"></i> Respuesta Incorrecta</p> <small><b>Respuesta Correcta: </b>${correctAnswer}</small>`;
    }
    checkCount();
}

function HTMLDecode(textString) {
    const doc = new DOMParser().parseFromString(textString, "text/html");
    return doc.documentElement.textContent;
}

function checkCount() {//validador de contador
    askedCount++;
    setCount();

    if (askedCount === totalQuestion) {
        _resultado.innerHTML += `<p>Tu puntaje es ${correctScore}.</p>`;
        _juegoNuevoBtn.style.display = "block";
        _checkBtn.style.display = "none";
    } else {
        setTimeout(loadQuestion, 1600);
    }
}

function setCount() {
    _totalpreguntas.textContent = totalQuestion;
    _puntajecorrecto.textContent = correctScore;
}

function restartrivia() {
    correctScore = askedCount = 0;//habilitar de preguntas 
    _juegoNuevoBtn.style.display = "none";
    _checkBtn.style.display = "block";
    _checkBtn.disabled = false;
    setCount();//contador de repsuestas incorrectas y correctas
    loadQuestion();//asigna las preguntas y entrega la info
}