document.addEventListener("DOMContentLoaded", function() {
    let currentQuestionIndex = 0;
    let questions = JSON.parse(document.getElementById('content').getAttribute('data-questions')); // Changed from const to let

    const content = document.getElementById('content');
    const btn = document.getElementById('revealBtn');
    const categoryDropdown = document.getElementById("categoryDropdown"); // Added reference to category dropdown

    function displayQuestion() {
        if (currentQuestionIndex < questions.length) {
            const question = escapeHTML(questions[currentQuestionIndex].fields.question_text);
            const answer = escapeHTML(questions[currentQuestionIndex].fields.answer_text);
            content.innerHTML = `<div class='question'>Question: ${question}</div><div class='answer' style='display: none;'>Answer: ${answer}</div>`;
            btn.textContent = "Reveal Answer";
        } else {
            content.innerHTML = "No more questions.";
            btn.style.display = "none";
        }
    }

    function escapeHTML(html) {
        return html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }

    displayQuestion();

    btn.addEventListener("click", function() {
        const answerElement = content.querySelector('.answer');
        if (btn.textContent === "Reveal Answer") {
            answerElement.style.display = "block";
            btn.textContent = "Next Question";
        } else {
            currentQuestionIndex++;
            displayQuestion();
        }
    });

    categoryDropdown.addEventListener("change", function() {
        var selectedCategory = this.value;
        if (selectedCategory === "") {
            questions = JSON.parse(document.getElementById('content').getAttribute('data-questions')); // Reset questions to initial set
        } else {
            questions = questions.filter(function(question) {
                return question.fields.category === selectedCategory;
            });
        }
        currentQuestionIndex = 0; // Reset currentQuestionIndex
        displayQuestion();
    });
});
