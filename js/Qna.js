
    const quizData = [
        {
        image: "Qna1.webp",
        question: "Clue: Kung dili ikaw iyang gusto lain ang gi tawag",
        options: ["Loop", "!yes", "Sign "],
        answer: "!yes"
        },
        {
        image: "Qna.png",
        question: "Clue: Bisag unsaon nimog fix sa inyong relasyon wla gihapon mo gana",
        options: [";", "Error", "<>"],
        answer: ";"
        },
        {
        image: "Qna.avif",
        question: "Clue: Mga kaylangan sa mga IT kung naay error",
        options: ["Gf", "Programmer", "Chatgpt"],
        answer: "Chatgpt"
        }
    ];

    let currentQuestion = 0;
    let score = 0;

    document.getElementById("total").textContent = quizData.length;

    function showQuestion() {
        const q = quizData[currentQuestion];
        document.getElementById("question").textContent = q.question;
        document.getElementById("current").textContent = currentQuestion + 1;
        document.getElementById("question-image").src = q.image;

        const optionsContainer = document.getElementById("options");
        optionsContainer.innerHTML = "";

        q.options.forEach((opt) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(btn, opt);
        optionsContainer.appendChild(btn);
        });
    }

    function checkAnswer(btn, selected) {
        const correct = quizData[currentQuestion].answer;
        const allButtons = document.querySelectorAll(".option-btn");

        allButtons.forEach((b) => (b.disabled = true));

        if (selected === correct) {
        btn.classList.add("correct");
        score++;
        } else {
        btn.classList.add("wrong");
        allButtons.forEach((b) => {
            if (b.textContent === correct) b.classList.add("correct");
        });
        }

        document.getElementById("score").textContent = `Score: ${score}`;

        setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            showQuestion();
        } else {
            document.getElementById("finalScore").textContent = `You scored ${score}/${quizData.length}`;
            document.getElementById("resultModal").style.display = "flex";
        }
        }, 1500);
    }

    function restartQuiz() {
        currentQuestion = 0;
        score = 0;
        document.getElementById("score").textContent = `Score: 0`;
        document.getElementById("resultModal").style.display = "none";
        showQuestion();
    }

    showQuestion();