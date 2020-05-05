(function () {
    // Functions
    function buildQuiz() {
        // variable to store the HTML output
        const output = [];

        // for each question...
        myQuestions.forEach(
            (currentQuestion, questionNumber) => {

                // variable to store the list of possible answers
                const answers = [];

                // and for each available answer...
                for (letter in currentQuestion.answers) {

                    // ...add an HTML radio button
                    answers.push(
                        `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
                    );
                }

                // add this question and its answers to the output
                output.push(
                    `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
                );
            }
        );
        // finally combine our output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join('');

        
    }

    function showResults() {

        // gather answer containers from our quiz
        const answerContainers = quizContainer.querySelectorAll('.answers');

        // keep track of user's answers
        let numCorrect = 0;

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {

            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // if answer is correct
            if (userAnswer === currentQuestion.correctAnswer) {
                // add to the number of correct answers
                numCorrect++;

                // color the answers green
                answerContainers[questionNumber].style.color = 'lightgreen';
            }
            // if answer is wrong or blank
            else {
                // color the answers red
                answerContainers[questionNumber].style.color = 'red';
            }
        });

        // show number of correct answers out of total
        resultsContainer.innerHTML = `score: ${numCorrect} out of ${myQuestions.length}`;
        link.innerHTML = `<button><a href="./index.html">Click to restart quiz</a></button>`;
        //questionno.innerHTML = `${myQuestions.length}`;
        score.innerHTML = `${numCorrect++}`;
    }

    function calcQuestionAndScore() {

    }

    function showSlide(n) {
        slides[currentSlide].classList.remove('active-slide');
        slides[n].classList.add('active-slide');
        currentSlide = n;
        if (currentSlide === 0) {
            previousButton.style.display = 'none';
        } else {
            previousButton.style.display = 'inline-block';
        }
        if (currentSlide === slides.length - 1) {
            nextButton.style.display = 'none';
            submitButton.style.display = 'inline-block';
        } else {
            nextButton.style.display = 'inline-block';
            submitButton.style.display = 'none';
        }
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }

    // Variables
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const link = document.getElementById('link');
    const myQuestions = [{
            question: "FC Barcelona was formed in what year?",
            answers: {
                a: 1890,
                b: 1991,
                c: 1903,
                d: 1899
            },
            correctAnswer: "d"
        },
        {
            question: "How many UCL trophies has AC Milan won?",
            answers: {
                a: 1,
                b: 3,
                c: 6,
                d: 7
            },
            correctAnswer: "d"
        },
        {
            question: "Who is the player with the most Ballon D'or awards?",
            answers: {
                a: "Messi",
                b: "Ronaldo",
                c: "David Beckham",
                d: "Michel Platini",
            },
            correctAnswer: "a"
        },
        {
            question: "Who is the oldest player to have played in the World Cup?",
            answers: {
                a: "Roger Milla",
                b: "Essam El-Hadary",
                c: "Samuel Eto'o",
                d: "Ryan Giggs"
            },
            correctAnswer: "b"
        },
        {
            question: "The player with the most trophies?",
            answers: {
                a: "Pele",
                b: "Dani Alves",
                c: "Messi",
                d: "Ronaldo"
            },
            correctAnswer: "b"
        }
    ];

    // Kick things off
    buildQuiz();

    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const score = document.getElementById('score');
    const questionno = document.getElementById('questionno');
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    // Show the first slide
    showSlide(currentSlide);

    // Event listeners
    submitButton.addEventListener('click', showResults);
    //previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
})();