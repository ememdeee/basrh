document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const questionCounter = document.getElementById('question-counter');
    const progressBar = document.querySelector('.progress-bar .progress');
    const genderOptions = document.querySelectorAll('input[name="gender"]');
    const watchPresentationBtn = document.getElementById('watch-presentation');
    const errorMessages = document.querySelectorAll('.error-message');
    
    // Sections
    const landingSection = document.getElementById('landing-section');
    const quizSection = document.getElementById('quiz-section');
    const resultsSection = document.getElementById('results-section');
    const confirmationSection = document.getElementById('confirmation-section');
    
    // Questions
    const questions = document.querySelectorAll('.question');
    let currentQuestion = 1;
    const totalQuestions = questions.length;
    
    // Form data
    const formData = {};
    
    // Auto-proceed after gender selection
    genderOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Get selected gender
            const selectedGender = document.querySelector('input[name="gender"]:checked').value;
            formData.gender = selectedGender;
            
            // Transition to quiz section
            switchSection(landingSection, quizSection, 'right');
            
            // Show first question
            showQuestion(currentQuestion);
        });
    });
    
    // Previous button
    prevBtn.addEventListener('click', function() {
        if (currentQuestion > 1) {
            currentQuestion--;
            showQuestion(currentQuestion);
            updateProgressBar();
        } else {
            // Go back to landing page if on first question
            switchSection(quizSection, landingSection, 'left');
        }
    });
    
    // Next button
    nextBtn.addEventListener('click', function() {
        tryToAdvance();
    });
    
    // Watch presentation button
    watchPresentationBtn.addEventListener('click', function() {
        alert('Thank you for your interest! The presentation would start here.');
    });
    
    // Answer selection with auto-advance
    document.querySelectorAll('.answer').forEach(answer => {
        const radio = answer.querySelector('input[type="radio"]');
        
        answer.addEventListener('click', function(event) {
            // Prevent event bubbling to avoid double triggers
            event.preventDefault();
            
            // Uncheck all other options in the same question
            const questionEl = this.closest('.question');
            questionEl.querySelectorAll('.answer').forEach(a => {
                a.classList.remove('active');
            });
            
            // Check this option
            radio.checked = true;
            this.classList.add('active');
            
            // Hide any error message
            const errorMessage = questionEl.querySelector('.error-message');
            errorMessage.classList.remove('show');
            
            // Auto-advance after a short delay
            setTimeout(() => {
                tryToAdvance();
            }, 600);
        });
    });
    
    // Functions
    function showQuestion(number) {
        // Hide all questions with a transition
        questions.forEach(question => {
            if (question.classList.contains('active')) {
                question.style.opacity = '0';
                question.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    question.classList.remove('active');
                    
                    // Show current question
                    const currentQuestionEl = document.querySelector(`.question[data-question="${number}"]`);
                    currentQuestionEl.classList.add('active');
                    
                    // Trigger reflow for animation
                    void currentQuestionEl.offsetWidth;
                    
                    // Animate in
                    setTimeout(() => {
                        currentQuestionEl.style.opacity = '1';
                        currentQuestionEl.style.transform = 'translateY(0)';
                    }, 50);
                    
                }, 300);
            }
        });
        
        // If no active questions yet, just show the current one
        if (!document.querySelector('.question.active')) {
            const currentQuestionEl = document.querySelector(`.question[data-question="${number}"]`);
            currentQuestionEl.classList.add('active');
            
            // Trigger reflow for animation
            void currentQuestionEl.offsetWidth;
            
            // Animate in
            setTimeout(() => {
                currentQuestionEl.style.opacity = '1';
                currentQuestionEl.style.transform = 'translateY(0)';
            }, 50);
        }
        
        // Update counter
        questionCounter.textContent = `${number}/${totalQuestions}`;
    }
    
    function updateProgressBar() {
        const progress = (currentQuestion / totalQuestions) * 100;
        progressBar.style.width = `${progress}%`;
    }
    
    function switchSection(fromSection, toSection, direction = 'right') {
        // Add exit animation class based on direction
        if (direction === 'left') {
            fromSection.classList.add('exit-left');
        } else {
            fromSection.classList.add('exit-right');
        }
        
        // Remove active class after animation
        setTimeout(() => {
            fromSection.classList.remove('active');
            fromSection.classList.remove('exit-left');
            fromSection.classList.remove('exit-right');
            
            // Add active class to destination section
            toSection.classList.add('active');
            
            // Reset transform for animation
            if (direction === 'left') {
                toSection.style.transform = 'translateX(-80px) scale(0.95)';
            } else {
                toSection.style.transform = 'translateX(80px) scale(0.95)';
            }
            
            // Trigger reflow
            void toSection.offsetWidth;
            
            // Animate to final position
            toSection.style.transform = 'translateX(0) scale(1)';
            toSection.style.opacity = '1';
        }, 600);
    }
    
    function tryToAdvance() {
        // Save current question answer
        const currentQuestionEl = document.querySelector(`.question[data-question="${currentQuestion}"]`);
        const selectedAnswer = currentQuestionEl.querySelector('input[type="radio"]:checked');
        const errorMessage = currentQuestionEl.querySelector('.error-message');
        
        if (selectedAnswer) {
            formData[`q${currentQuestion}`] = selectedAnswer.value;
            
            if (currentQuestion < totalQuestions) {
                // Go to next question
                currentQuestion++;
                showQuestion(currentQuestion);
                updateProgressBar();
            } else {
                // Submit form and show results
                submitForm();
            }
        } else {
            // Show error message with animation
            errorMessage.classList.add('show');
            
            // Add a little shake animation to the card
            const quizCard = document.querySelector('.quiz-card');
            quizCard.style.animation = 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both';
            
            // Remove the animation after it completes
            setTimeout(() => {
                quizCard.style.animation = '';
            }, 500);
        }
    }
    
    function submitForm() {
        // Switch to results section
        switchSection(quizSection, resultsSection, 'right');
        
        // Create the updated progress circle structure
        updateProgressCircle();
        
        // Simulate loading progress
        let progress = 0;
        const progressPercentage = document.getElementById('progress-percentage');
        
        const interval = setInterval(() => {
            progress += 1;
            progressPercentage.textContent = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
                // Show confirmation section
                setTimeout(() => {
                    switchSection(resultsSection, confirmationSection, 'right');
                }, 500);
            }
        }, 30);
    }
    
    function updateProgressCircle() {
        const progressCircle = document.querySelector('.progress-circle');
        progressCircle.innerHTML = `
            <div class="progress-circle-track"></div>
            <div class="progress-circle-fill"></div>
            <div class="progress-circle-inner">
                <span id="progress-percentage">67%</span>
            </div>
            <div class="progress-circle-dot-container">
                <div class="progress-circle-dot"></div>
            </div>
        `;
    }
    
    // Add shake animation for error feedback
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            10%, 90% { transform: translate3d(-1px, 0, 0); }
            20%, 80% { transform: translate3d(2px, 0, 0); }
            30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
            40%, 60% { transform: translate3d(4px, 0, 0); }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize
    showQuestion(currentQuestion);
    updateProgressBar();
});