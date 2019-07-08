const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let randomNumber = Math.round(Math.random() * 10)
let lives = 5
let playerName = null

console.clear()

console.log(`

  Welcome to
   G U E S S
    T H A T
  N U M B E R

`)

function readyToPlay () {
  rl.question("\n Are you ready to play (y/n)?\n", (answer) => {
    if (answer == 'y') {
      askName()
    } else if (answer == 'n') {
      console.log("\n No worries, take your time!\n")
      readyToPlay()
    } else {
      console.log("\n Sorry, I didn't catch that, let's try again...")
      readyToPlay()
    }
  })
}

function askName () {
  rl.question("\n What is your name?\n", (answer) => {
    playerName = answer
    console.log(`\n Greetings ${playerName}!`)
    livesRemaining()
  })
}

function makeGuess () {
  rl.question("\n Pick a number between 1-10\n", (answer) => {
    if (answer == randomNumber) {
      winGame()
    } else if (lives > 1) {
      console.log(`\n Wup wuh. That's not it.`)
      lives = lives - 1
      livesRemaining()
    } else {
      endGame()
    }
  })
}

function livesRemaining () {
  console.log(`\n You have ${lives} lives remaining.`)
  makeGuess()
}

function winGame () {
  console.log(`\n\n Yusssss! \n\n ${playerName} is the champion! \n\n ${randomNumber} is the correct answer!\n\n\n`)
  playAgain()
}

function endGame () {
  console.log(`\n Oh no ${playerName}, it's

  G A M E
  O V E R


  `)
  playAgain()
}

function playAgain () {
  rl.question('\nDo you want to play again (y/n)?\n', (answer) => {
    if (answer == 'y') {
      console.clear()
      randomNumber = Math.round(Math.random() * 10)
      lives = 5
      console.log(`\n Welcome back ${playerName}!`)
      makeGuess()
    } else if (answer == 'n') {
      rl.close()
    } else {
      console.log("I didn't catch that, let's try again...")
      return playAgain()
    }
  })
}

readyToPlay()
