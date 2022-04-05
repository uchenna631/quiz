const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#save-score-btn')
const finalScore = document.querySelector('#final-score')
const mostRecentSCore = localStorage.getItem('#most-recent-score')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const maxHighScore = 5

finalScore.innerText =  mostRecentSCore

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

saveHighScore() = e => {
    e.preventDefault()

    const score = {
        score: mostRecentSCore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
    return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('/')

}