// Execute the following code when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Initialize variables
    let currentQuestionIndex = 0; // Index to track current question being displayed
    let questions = JSON.parse(document.getElementById('content').getAttribute('data-questions')); // Retrieve questions from data attribute

    // Get references to DOM elements
    const content = document.getElementById('content'); // Content container
    const btn = document.getElementById('revealBtn'); // Button to reveal answer
    const categoryDropdown = document.getElementById("categoryDropdown"); // Dropdown menu for filtering questions by category

    // Function to display question and answer
    function displayQuestion() {
        if (currentQuestionIndex < questions.length) {
            // Retrieve question and answer text, and escape HTML characters
            const question = escapeHTML(questions[currentQuestionIndex].fields.question_text);
            const answer = escapeHTML(questions[currentQuestionIndex].fields.answer_text);
            // Display question and answer in content container
            content.innerHTML = `<div class='question'>Question: ${question}</div><div class='answer' style='display: none;'>Answer: ${answer}</div>`;
            // Update button text
            btn.textContent = "Reveal Answer";
        } else {
            // Display message when no more questions are available
            content.innerHTML = "No more questions.";
            // Hide the button
            btn.style.display = "none";
        }
    }

    // Function to escape HTML characters
    function escapeHTML(html) {
        return html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }

    // Initial display of question
    displayQuestion();

    // Event listener for button click to reveal answer or show next question
    btn.addEventListener("click", function() {
        const answerElement = content.querySelector('.answer'); // Get reference to answer element
        if (btn.textContent === "Reveal Answer") {
            // Display answer when button text is "Reveal Answer"
            answerElement.style.display = "block";
            btn.textContent = "Next Question";
        } else {
            // Show next question when button text is "Next Question"
            currentQuestionIndex++;
            displayQuestion();
        }
    });

    // Event listener for category dropdown change
    categoryDropdown.addEventListener("change", function() {
        var selectedCategory = this.value; // Get the selected category
        if (selectedCategory === "") {
            // Reset questions to initial set when no category is selected
            questions = JSON.parse(document.getElementById('content').getAttribute('data-questions'));
        } else {
            // Filter questions by selected category
            questions = questions.filter(function(question) {
                return question.fields.category === selectedCategory;
            });
        }
        // Reset currentQuestionIndex and display the question
        currentQuestionIndex = 0;
        displayQuestion();
    });
});
