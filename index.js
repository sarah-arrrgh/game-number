const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let randomNumber = Math.round(Math.random() * 10)
let lives = 5
let playerName = null

// strings returned in console
const welcome = `

  Welcome to
   G U E S S
    T H A T
  N U M B E R

`
const areYouReadyQ = `
  Are you ready to play (y/n)?
`
const notReady = `
  No worries, take your time!
`
const tryAgain = `
  Sorry, I didn't catch that, let's try again...
`
const nameQ = `
  What is your name?
`
const pickANumberQ = `
  Pick a number between 1-10...
`
const playAgainQ = `
  Do you want to play again (y/n)?
`
const wrongGuess = `
  Wup wuh. That's not it.
`

// functions that return strings in console
function greetings(name) {
  return `
  Greetings ${name}!
  `
}

function livesLeft(numberOfLives) {
  return `
  You have ${numberOfLives} lives remaining.
  `
}

function goAgain(name) {
  return `
  Let's go ${name}!
  `
}

function youWin(name, number) {
  return `

  Yusssss!

  ${name} is the champion!

  ${number} is the correct answer!

  `
}

function gameOver(name) {
  return `

  Oh no ${name}, it's

  G A M E
  O V E R

  `
}

// game functionality
function welcomeMessage (cb) {
  console.log(welcome)
  cb && cb()
}

function readyToPlay() {
  rl.question(areYouReadyQ, (answer) => {
    if (answer == 'y') {
      askName()
    } else if (answer == 'n') {
      console.log(notReady)
      readyToPlay()
    } else {
      console.log(tryAgain)
      readyToPlay()
    }
  })
}

function askName () {
  rl.question(nameQ, (answer) => {
    playerName = answer
    console.log(greetings(playerName))
    livesRemaining()
  })
}

function makeGuess () {
  rl.question(pickANumberQ, (answer) => {
    if (answer == randomNumber) {
      winGame()
    } else if (lives > 1) {
      console.log(wrongGuess)
      lives = lives - 1
      livesRemaining()
    } else {
      endGame()
    }
  })
}

function livesRemaining () {
  console.log(livesLeft(lives))
  makeGuess()
}

function winGame () {
  console.log(youWin(playerName, randomNumber))
  playAgain()
}

function endGame () {
  console.log(gameOver(playerName))
  playAgain()
}

function playAgain () {
  rl.question(playAgainQ, (answer) => {
    if (answer == 'y') {
      console.clear()
      randomNumber = Math.round(Math.random() * 10)
      lives = 5
      console.log(goAgain(playerName))
      welcomeMessage(makeGuess)
    } else if (answer == 'n') {
      console.clear()
      randomNumber = Math.round(Math.random() * 10)
      lives = 5
      welcomeMessage(readyToPlay)
    } else {
      console.log(tryAgain)
      playAgain()
    }
  })
}

console.clear()
welcomeMessage(readyToPlay)
