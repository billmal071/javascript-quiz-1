const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const scoreKeeper = document.getElementById('score')
const questionNum = document.getElementById('questionNum')
const totalScore = document.getElementById('totalScore')
const scoreButton = document.getElementById('score-btn')

let shuffledQuestions, currentQuestionIndex;
let countRightAnswers = 0;

//start button and next button
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

//start game
function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    scoreButton.classList.add('hide')
    countRightAnswers = 0;
    scoreKeeper.innerHTML = countRightAnswers
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
    questionNum.innerHTML = currentQuestionIndex + 1
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        //display total score
        //totalScore.innerHTML = countRightAnswers;
        scoreButton.classList.remove('hide')
        //restart
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
    if (selectedButton.dataset = correct) {
        countRightAnswers++;
        // +1, change it if you need +10, +25 etc
    }
    //show score
    scoreKeeper.innerHTML = countRightAnswers + " out of " + (currentQuestionIndex + 1);
    //totalscore
    totalScore.innerHTML = countRightAnswers;
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

//questions
const questions = [{
        question: "FC Barcelona was formed in what year?",
        answers: [{
                text: '1890',
                correct: false
            },
            {
                text: '1991',
                correct: false
            },
            {
                text: '1903',
                correct: false
            },
            {
                text: '1899',
                correct: true
            }
        ]
    },
    {
        question: "How many UCL trophies has AC Milan won?",
        answers: [{
                text: '1',
                correct: false
            },
            {
                text: '3',
                correct: false
            },
            {
                text: '6',
                correct: false
            },
            {
                text: '7',
                correct: true
            }
        ]
    },
    {
        question: "Who is the player with the most Ballon D'or awards?",
        answers: [{
                text: 'Messi',
                correct: true
            },
            {
                text: 'Ronaldo',
                correct: false
            },
            {
                text: 'David Beckham',
                correct: false
            },
            {
                text: 'Michel Platini',
                correct: false
            }
        ]
    },
    {
        question: "Who is the oldest player to have played in the World Cup?",
        answers: [{
                text: 'Roger Milla',
                correct: false
            },
            {
                text: 'Essam El-Hadary',
                correct: true
            },
            {
                text: 'Samuel Eto\'o',
                correct: false
            },
            {
                text: 'Ryan Giggs',
                correct: false
            }
        ]
    },
    {
        question: "The player with the most trophies?",
        answers: [{
                text: 'Pele',
                correct: false
            },
            {
                text: 'Dani Alves',
                correct: true
            },
            {
                text: 'Messi',
                correct: false
            },
            {
                text: 'Ronaldo',
                correct: false
            }
        ]
    }
];