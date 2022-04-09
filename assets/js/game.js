const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progress-text');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progress-bar-full');

const scorePoints = 100;
let currentQuestion = {};
let score;
let questionCounter = 0;
let availableQuestions = [];
let questionIndex;

let questions = [{
    question: 'what is 2 + 1',
    choice1: '5',
    choice2: '4',
    choice3: '3',
    choice4: '21',
    answer: 3
},
{
    question: 'what is 2 + 2',
       choice1: '5',
       choice2: '4',
       choice3: '9',
       choice4: '21',
       answer: 4
   },
   {
    question: 'what is 2 + 3',
       choice1: '5' ,
       choice2: '4',
       choice3: '35',
       choice4: '21',
       answer: 5
   },
   {
    question: 'what is 2 + 4',
       choice1: '5',
       choice2: '4',
       choice3: '6',
       choice4: '21',
       answer: 6
   }
];

/**The main game function */
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    runGame()

}

function questionProgression(){
    const maxNumOfQuestion = 4;
    progressText.innerText = `Question ${questionCounter} of ${maxNumOfQuestion}`
    progressBarFull.style.width = `${(questionCounter/maxNumOfQuestion)*100}%`
}

function makeChoice(){
    choices.forEach(choice => {
        choice.addEventListener('click', e => {
            if(!acceptingAnswers) return 
            acceptingAnswers = false
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.innerText

            let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

            if(classToApply === 'correct') {
                incrementScore(scorePoints)
            }

            selectedChoice.parentElement.classList.add(classToApply);

            setTimeout(()=> {
                selectedChoice.parentElement.classList.remove(classToApply);
                runGame();
            }, 500)
            })
        })
}

function getRandomQuestion () {

        // Generate random number to pick question at random
        questionIndex = Math.floor(Math.random() * availableQuestions.length)
        currentQuestion = availableQuestions[questionIndex]
        question.innerText = currentQuestion.question
        
        //Assign chosen question's choice as the choice inner
        choices.forEach(choice => {
            const number = choice.dataset['number']
            choice.innerText = currentQuestion['choice' + number]
        })
}

function runGame() {

    const maxNumOfQuestion = 4;
    questionCounter++
    if (questionCounter <= maxNumOfQuestion){
        questionProgression()

        getRandomQuestion()

        availableQuestions.splice(questionIndex, 1);
        acceptingAnswers = true;

        makeChoice()

    } else {
        return window.location.assign('/end.html')}
}

function incrementScore(num) {
    score += num
    localStorage.setItem('mostRecentScore', score)
    scoreText.innerText = score
     }

startGame()