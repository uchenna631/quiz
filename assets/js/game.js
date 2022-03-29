const question = document.querySelector('#question');
const choices = document.querySelectorAll('.choice-text');
const progressText = document.querySelector('#progress-text');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progress-bar-full');

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
       choice1: '5',
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
]

const scorePoints = 100;
const maxQuestions = 4

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    getNewQuestion()
}


getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > maxQuestions) {
        localStorage.setItem('mostRecentSCore', score)
        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${maxQuestions}`
    progressBarFull.style.width = `${(questionCounter/maxQuestions)*100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1);
    acceptingAnswers = true;
}

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
    scoreText.innerText = score

}

startGame()