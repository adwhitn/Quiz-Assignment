const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [
    {
        question: "What's the best way to cook a grilled cheese?",
        choice1: "Butter on the bread",
        choice2: "Oil in the pan",
        choice3: "no butter",
        choice4: "Butter in the pan",
        answer: 4
    },

    {
        question: "Whats the first step in cooking rice?",
        choice1: "Boil water",
        choice2: "Rinse rice",
        choice3: "Season the rice",
        choice4: "Pray",
        answer: 2
    },
    {
        question: "What is the best chicken meat to cook with?",
        choice1: "Breast",
        choice2: "Thighs",
        choice3: "Legs",
        choice4: "Wings",
        answer: 2
    }
]

fetch("questions.json")
    .then( res => {
        return res.json();
    })
    .then( loadedQuestions => {
    console.log(loadedQuestions);
});
// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem("mostRecentScore", score);
        //go to the end page
        return window.location.assign("end.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice'+ number];
    });
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
}
choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        if(classToApply == 'correct') {
            incrementScore(CORRECT_BONUS);
        }
    selectedChoice.parentElement.classList.add(classToApply); 
    setTimeout( () => {
    selectedChoice.parentElement.classList.remove(classToApply);   
    getNewQuestion();
    }, 1000);
    });
});
incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
};
startGame();