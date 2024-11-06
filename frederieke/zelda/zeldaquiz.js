const questions = [
    {
        question: "Hoe heet de hoofdpersonage van zelda",
        answers: ["Link", "Zelda", "Navi", "Erika"],
        correct: 1
    },
    {
        question: "In welk spel kwam de master sword het eerst voor ",
        answers: ["twiglight princess", "the windwaker", "ocarina of time", "the legend of zelda"],
        correct: 3
    },
    {
        question: "Welke kleuren zijn het hylianen shield",
        answers: ["roze glitters", "geel,groen,bruin", "zilver rood,blauw", "paars"],
        correct: 3
    },
    {
        question: "Welke prinses red je in de game?",
        answers: ["Zelda", "peach", "daisy", "monika"],
        correct: 1
    }
];

let currentQuestion = 0;

function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('question').innerText = q.question;
    document.getElementById('answer1').innerText = q.answers[0];
    document.getElementById('answer2').innerText = q.answers[1];
    document.getElementById('answer3').innerText = q.answers[2];
    document.getElementById('answer4').innerText = q.answers[3];
    document.getElementById('result').innerText = '';
}

function checkAnswer(answer) {
    if (answer === questions[currentQuestion].correct) {
        document.getElementById('result').innerText = 'goed!';
    } else {
        document.getElementById('result').innerText = 'fout.';
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        setTimeout(loadQuestion, 2000);
    } else {
        setTimeout(() => alert('Quiz is voorbij!'), 2000);
    }
}

loadQuestion();