const questions = [
    {
        "questionType": "multipleChoice",
        "questionText": "What is a common name for Vitamin C?",
        "options": ["Ascorbic Acid", "Citric Acid", "Acetic Acid", "Folic Acid"],
        "correctAnswer": "Ascorbic Acid",
        "explanation": "Ascorbic acid is the chemical name for Vitamin C, known for its antioxidant properties and immune support."
    },
    {
        "questionType": "multipleChoice",
        "questionText": "Sound travels fastest through which medium?",
        "options": ["Air", "Water", "Steel", "Vacuum"],
        "correctAnswer": "Steel",
        "explanation": "Sound travels faster through solids (like steel) because the molecules are more tightly packed."
    },
    {
        "questionType": "multipleChoice",
        "questionText": "How many bones does the average adult human have?",
        "options": ["106", "206", "306", "406"],
        "correctAnswer": "206",
        "explanation": "The adult human skeleton typically consists of 206 bones."
    },
    {
        "questionType": "multipleChoice",
        "questionText": "What color do you get when you mix blue and yellow?",
        "options": ["Red", "Purple", "Green", "Orange"],
        "correctAnswer": "Green",
        "explanation": "Mixing blue and yellow produces the color green."
    },
    {
        "questionType": "multipleChoice",
        "questionText": "Spiders belong to which class of animals?",
        "options": ["Insects", "Arachnids", "Crustaceans", "Myriapods"],
        "correctAnswer": "Arachnids",
        "explanation": "Spiders are arachnids, characterized by eight legs and two body segments."
    },
    {
        "questionType": "multipleChoice",
        "questionText": "Which instrument is used to measure temperature?",
        "options": ["Barometer", "Hygrometer", "Thermometer", "Anemometer"],
        "correctAnswer": "Thermometer",
        "explanation": "Thermometers measure temperature, often using a scale like Celsius or Fahrenheit."
    },
    {
        "questionType": "multipleChoice",
        "questionText": "What is the opposite of 'north'?",
        "options": ["East", "West", "South", "Northeast"],
        "correctAnswer": "South",
        "explanation": "South is the cardinal direction directly opposite of North."
    },
    {
        "questionType": "multipleChoice",
        "questionText": "What force pulls objects towards each other?",
        "options": ["Friction", "Magnetism", "Gravity", "Tension"],
        "correctAnswer": "Gravity",
        "explanation": "Gravity is the fundamental force of attraction between objects with mass."
    },
    {
        "questionType": "multipleChoice",
        "questionText": "Which celestial body does Earth orbit?",
        "options": ["The Moon", "Mars", "The Sun", "The North Star"],
        "correctAnswer": "The Sun",
        "explanation": "Earth, along with other planets, orbits the Sun, which is the center of our solar system."
    },
    {
        "questionType": "multipleChoice",
        "questionText": "What is matter primarily composed of?",
        "options": ["Energy", "Atoms", "Light", "Sound"],
        "correctAnswer": "Atoms",
        "explanation": "Atoms are the basic building blocks of matter, consisting of protons, neutrons, and electrons."
    }
]

let currentQuestion = 0;

let score = {
    0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0
}

const checkAnswer = (questionIndex, option) => {
    let correctAnswer = questions[questionIndex].correctAnswer;
    console.log("called", option, correctAnswer, questionIndex);

    if (correctAnswer === option) {
        score[questionIndex] = 1;
    }
}

const container = document.querySelector(".container");
const question = document.querySelector(".question");
const options = document.querySelector("#options");
const nextButton = document.querySelector(".next-button");
const scoreElement = document.querySelector(".score");
const result = document.querySelector(".result");
const remarks = document.querySelector(".remarks");

const loadQuestion = (questionIndex) => {

    console.log(questions[questionIndex].questionText);
    options.innerHTML = "";
    question.textContent = questions[questionIndex].questionText;
    questions[questionIndex].options.map((option, index) => {
        const div = document.createElement("div");
        div.className = "option";
        div.onclick = function () {
            checkAnswer(questionIndex, option);
        }

        const input = document.createElement("input");
        input.type = "radio";
        input.name = "options"
        input.id = `option-${index}`;

        const label = document.createElement("label");
        label.htmlFor = `option-${index}`;
        label.textContent = option

        div.appendChild(input);
        div.appendChild(label);
        options.appendChild(div);
    });
    if (currentQuestion == 9) {
        nextButton.textContent = "Finish";
    }
}

const nextQuestion = () => {
    currentQuestion += 1;
    if (currentQuestion >= 10) {
        finishExam();
        return;
    }
    loadQuestion(currentQuestion);
}

const calculateFinalScore = () => {
    let finalScore = 0;
    for (let i = 0; i < 10; i++) {
        finalScore += score[i];
    }
    return finalScore;
}


const finishExam = () => {
    let finalScore = calculateFinalScore();
    scoreElement.textContent = finalScore;
    container.style.display = "none"
    if (finalScore == 10) {
        const div = document.createElement("div");
        div.classList.add("remark-exp");
        div.textContent = "Congrats!! You have answerd all correctly";
        remarks.appendChild(div);
    } else {
        questions.forEach((question, index) => {
            if (score[index] == 1)
                return;
            remarks.appendChild(remarksDivMaker(question, index));
        })
    }

    if (finalScore < 4) {
        result.childNodes[1].childNodes[1].style.color = "red";
    } else if (finalScore >= 4 && finalScore <= 7) {
        result.childNodes[1].childNodes[1].style.color = "orange";
    }
    result.style.display = "block";
    score = {
        0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0
    }
}

const remarksDivMaker = (question, index) => {
    const div = document.createElement("div");
    div.classList.add("remark-exp");
    div.innerHTML = `
        <span class="question-number">${index + 1}.</span>
        <span class="correct-answer">Correct Answer: ${question.correctAnswer}</span>
        <span class="explanation">Explanation: ${question.explanation}</span>
    `;
    return div;
}

const startNew = () => {
    window.location.reload();
}

window.addEventListener("load", loadQuestion(currentQuestion))
