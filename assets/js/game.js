const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progress-text');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progress-bar-full');

const scorePoints = 100;
const maxNumQuest = 4;

let currentQuestion = {};
let acceptingAnswers = true;
let score;
let questionCounter = 0;
let availableQuestions = [];
let mostRecentSCore = []


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
       choice1: '5 I love you so much dear. I cannot do without you' ,
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

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    getNewQuestion()

    //New lines

    // saveMostRecentScore(score)

}

//New function
function saveMostRecentScore(score){

    localStorage.setItem('mostRecentSCore', score)

    return window.location.assign('/end.html')
}

function getNewQuestion () {
    questionCounter++
    if (questionCounter <= maxNumQuest){
        progressText.innerText = `Question ${questionCounter} of ${maxNumQuest}`
        progressBarFull.style.width = `${(questionCounter/maxNumQuest)*100}%`

        const questionIndex = Math.floor(Math.random() * availableQuestions.length)
        currentQuestion = availableQuestions[questionIndex]
        question.innerText = currentQuestion.question

        choices.forEach(choice => {
            const number = choice.dataset['number']
            choice.innerText = currentQuestion['choice' + number]
        })

        availableQuestions.splice(questionIndex, 1);
        acceptingAnswers = true;

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
                getNewQuestion();
            }, 1000)
            })
        })

        incrementScore = num => {
        score += num
        localStorage.setItem('mostRecentScore', score)
        scoreText.innerText = score
         }

    } else {
        mostRecentSCore = []
        mostRecentSCore.push(score)
        console.log(mostRecentSCore)
        return window.location.assign('/end.html')}
}
startGame()