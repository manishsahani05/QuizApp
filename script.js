const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");

const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

// Start Quiz
startButton.addEventListener("click", startGame);

// Next Question
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {

    startButton.classList.add("hide");

    shuffledQuestions = questions.sort(() => Math.random() - 0.5);

    currentQuestionIndex = 0;
    score = 0;

    document.getElementById("right-answers").innerText = score;

    questionContainer.classList.remove("hide");

    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {

    questionElement.innerText = question.question;

    question.answer.forEach(answer => {

        const button = document.createElement("button");

        button.innerText = answer.text;
        button.classList.add("btn");

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);

        answerButtons.appendChild(button);

    });
}

function resetState() {

    clearStatusClass(document.body);

    nextButton.classList.add("hide");

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }

}

function selectAnswer(e) {

    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";

    if (correct) {
        score++;
        document.getElementById("right-answers").innerText = score;
    }

    setStatusClass(document.body, correct);

    Array.from(answerButtons.children).forEach(button => {

        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else {
            button.classList.add("wrong");
        }

        button.disabled = true;

    });

    if (currentQuestionIndex < shuffledQuestions.length - 1) {

        nextButton.classList.remove("hide");

    } else {

        startButton.innerText = "Restart Quiz";
        startButton.classList.remove("hide");

    }

}

function setStatusClass(element, correct) {

    clearStatusClass(element);

    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }

}

function clearStatusClass(element) {

    element.classList.remove("correct");
    element.classList.remove("wrong");

}

const questions = [

    {
        question: "Which one of these is a JavaScript Framework?",
        answer: [
            { text: "Python", correct: false },
            { text: "Django", correct: false },
            { text: "React", correct: true },
            { text: "Eclipse", correct: false }
        ]
    },

    {
        question: "HTML stands for?",
        answer: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Text Machine Language", correct: false },
            { text: "Hyper Transfer Markup Language", correct: false },
            { text: "Home Tool Markup Language", correct: false }
        ]
    },

    {
        question: "CSS is used for?",
        answer: [
            { text: "Styling Web Pages", correct: true },
            { text: "Database", correct: false },
            { text: "Programming", correct: false },
            { text: "Operating System", correct: false }
        ]
    }

];
