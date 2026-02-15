// Global variables
let currentQuizType = '';
let currentQuestionIndex = 0;
let quizAnswers = [];
let isRecording = false;

// Quiz data
const quizData = {
  diabetes: {
    questions: [
      {
        question: "How often do you exercise?",
        options: ["Daily", "2-3 times per week", "Rarely", "Never"]
      },
      {
        question: "What is your age group?",
        options: ["Under 30", "30-45", "46-60", "Over 60"]
      },
      {
        question: "Do you have a family history of diabetes?",
        options: ["Yes, immediate family", "Yes, extended family", "No", "Not sure"]
      },
      {
        question: "How would you describe your diet?",
        options: ["Very healthy", "Moderately healthy", "Average", "Poor"]
      },
      {
        question: "What is your BMI category?",
        options: ["Normal (18.5-24.9)", "Overweight (25-29.9)", "Obese (30+)", "Not sure"]
      }
    ]
  },
  heart: {
    questions: [
      {
        question: "Do you smoke?",
        options: ["Never", "Former smoker", "Occasionally", "Daily"]
      },
      {
        question: "How often do you experience chest discomfort?",
        options: ["Never", "Rarely", "Sometimes", "Frequently"]
      },
      {
        question: "What is your blood pressure status?",
        options: ["Normal", "Slightly elevated", "High", "Not sure"]
      },
      {
        question: "How often do you exercise?",
        options: ["Daily", "2-3 times per week", "Rarely", "Never"]
      },
      {
        question: "Do you have a family history of heart disease?",
        options: ["No", "Yes, one relative", "Yes, multiple relatives", "Not sure"]
      },
      {
        question: "How would you rate your stress level?",
        options: ["Low", "Moderate", "High", "Very high"]
      }
    ]
  },
  mental: {
    questions: [
      {
        question: "How often do you feel anxious or worried?",
        options: ["Rarely", "Sometimes", "Often", "Almost always"]
      },
      {
        question: "How would you rate your sleep quality?",
        options: ["Excellent", "Good", "Fair", "Poor"]
      },
      {
        question: "Do you feel motivated in daily activities?",
        options: ["Very motivated", "Moderately motivated", "Somewhat unmotivated", "Very unmotivated"]
      },
      {
        question: "How often do you socialize with others?",
        options: ["Very often", "Regularly", "Occasionally", "Rarely"]
      },
      {
        question: "How do you handle stress?",
        options: ["Very well", "Moderately well", "With difficulty", "Poorly"]
      },
      {
        question: "Have you experienced significant mood changes recently?",
        options: ["No changes", "Minor changes", "Moderate changes", "Significant changes"]
      },
      {
        question: "How satisfied are you with your life currently?",
        options: ["Very satisfied", "Satisfied", "Somewhat dissatisfied", "Very dissatisfied"]
      }
    ]
  }
};

// Screen navigation
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(screenId).classList.add('active');
}


// Logout function
function logout() {
  if (confirm('Are you sure you want to logout?')) {
    showScreen('loginScreen');
  }
}

// Set active navigation
function setActiveNav(element) {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  element.classList.add('active');
}

// Voice input toggle
function toggleVoice() {
  const voiceBtn = document.getElementById('voiceBtn');
  const voiceStatus = document.getElementById('voiceStatus');

  isRecording = !isRecording;

  if (isRecording) {
    voiceBtn.classList.add('recording');
    voiceStatus.textContent = '🔴 Recording... Tap to stop';

    // Simulate voice recording
    setTimeout(() => {
      if (isRecording) {
        toggleVoice();
        document.getElementById('symptomInput').value = "I have been experiencing headaches and mild fever for the past 2 days.";
      }
    }, 3000);
  } else {
    voiceBtn.classList.remove('recording');
    voiceStatus.textContent = 'Tap to use voice input';
  }
}

// Analyze symptoms
function analyzeSymptoms() {
  const symptoms = document.getElementById('symptomInput').value.trim();

  if (!symptoms) {
    alert('Please describe your symptoms first!');
    return;
  }

  const resultsDiv = document.getElementById('symptomResults');
  resultsDiv.innerHTML = '<div class="spinner"></div>';
  resultsDiv.style.display = 'block';

  // Simulate AI analysis
  setTimeout(() => {
    resultsDiv.innerHTML = `
                    <div class="symptom-result">
                        <h3 style="font-size: 20px; font-weight: 600; color: #2d3748; margin-bottom: 15px;">Analysis Results</h3>
                        
                        <div style="background: white; padding: 15px; border-radius: 10px; margin: 15px 0;">
                            <h4 style="font-weight: 600; color: #2d3748; margin-bottom: 10px;">🦠 Possible Condition: Common Flu</h4>
                            <div class="confidence-meter">
                                <span style="color: #718096; font-size: 14px;">Confidence:</span>
                                <div class="progress-bar" style="flex: 1;">
                                    <div class="progress-fill" style="width: 85%;"></div>
                                </div>
                                <span style="color: #667eea; font-weight: 600;">85%</span>
                            </div>
                        </div>

                        <div style="background: #fff3cd; padding: 15px; border-radius: 10px; margin: 15px 0;">
                            <h4 style="font-weight: 600; color: #856404; margin-bottom: 10px;">⚠️ Symptoms Match</h4>
                            <ul style="color: #856404; padding-left: 20px; font-size: 14px;">
                                <li>Headache ✓</li>
                                <li>Fever ✓</li>
                                <li>Body aches (typical)</li>
                            </ul>
                        </div>

                        <div style="background: #d4edda; padding: 15px; border-radius: 10px; margin: 15px 0;">
                            <h4 style="font-weight: 600; color: #155724; margin-bottom: 10px;">💊 Recommendations</h4>
                            <ul style="color: #155724; padding-left: 20px; font-size: 14px;">
                                <li style="margin: 5px 0;">Rest and stay hydrated</li>
                                <li style="margin: 5px 0;">Take over-the-counter pain relievers</li>
                                <li style="margin: 5px 0;">Monitor temperature regularly</li>
                                <li style="margin: 5px 0;">Consult a doctor if symptoms worsen</li>
                            </ul>
                        </div>

                        <div style="background: #f8d7da; padding: 15px; border-radius: 10px; margin: 15px 0;">
                            <h4 style="font-weight: 600; color: #721c24; margin-bottom: 10px;">🚨 When to Seek Emergency Care</h4>
                            <p style="color: #721c24; font-size: 14px;">Contact a doctor immediately if you experience: difficulty breathing, chest pain, persistent high fever (>103°F), or severe weakness.</p>
                        </div>

                        <button class="btn-primary w-full" onclick="showScreen('nearbyScreen')">🏥 Find Nearby Clinics</button>
                    </div>
                `;
  }, 2000);
}

// Preview uploaded image
function previewImage(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById('previewImg').src = e.target.result;
      document.getElementById('imagePreview').style.display = 'block';
    };
    reader.readAsDataURL(input.files[0]);
  }
}

// Analyze scan
function analyzeScan() {
  const resultsDiv = document.getElementById('scanResults');
  resultsDiv.innerHTML = '<div class="spinner"></div>';
  resultsDiv.style.display = 'block';

  setTimeout(() => {
    resultsDiv.innerHTML = `
                    <div class="symptom-result">
                        <h3 style="font-size: 20px; font-weight: 600; color: #2d3748; margin-bottom: 15px;">Image Analysis Results</h3>
                        
                        <div style="background: white; padding: 15px; border-radius: 10px; margin: 15px 0;">
                            <h4 style="font-weight: 600; color: #2d3748; margin-bottom: 10px;">🔬 Detection: Minor Skin Irritation</h4>
                            <div class="confidence-meter">
                                <span style="color: #718096; font-size: 14px;">Confidence:</span>
                                <div class="progress-bar" style="flex: 1;">
                                    <div class="progress-fill" style="width: 78%;"></div>
                                </div>
                                <span style="color: #667eea; font-weight: 600;">78%</span>
                            </div>
                        </div>

                        <div style="background: #d4edda; padding: 15px; border-radius: 10px; margin: 15px 0;">
                            <h4 style="font-weight: 600; color: #155724; margin-bottom: 10px;">✅ Analysis</h4>
                            <p style="color: #155724; font-size: 14px;">The image shows signs of mild skin irritation, possibly from contact dermatitis or minor allergic reaction. The affected area appears slightly inflamed but without severe symptoms.</p>
                        </div>

                        <div style="background: #fff3cd; padding: 15px; border-radius: 10px; margin: 15px 0;">
                            <h4 style="font-weight: 600; color: #856404; margin-bottom: 10px;">💡 Recommendations</h4>
                            <ul style="color: #856404; padding-left: 20px; font-size: 14px;">
                                <li style="margin: 5px 0;">Apply cold compress to reduce inflammation</li>
                                <li style="margin: 5px 0;">Avoid scratching the affected area</li>
                                <li style="margin: 5px 0;">Use over-the-counter anti-itch cream</li>
                                <li style="margin: 5px 0;">Keep the area clean and dry</li>
                            </ul>
                        </div>

                        <p style="color: #718096; font-size: 13px; font-style: italic; text-align: center;">⚠️ This is an AI-powered analysis. Please consult a dermatologist for accurate diagnosis.</p>

                        <button class="btn-primary w-full mt-4" onclick="showScreen('nearbyScreen')">🏥 Find Dermatologist</button>
                    </div>
                `;
  }, 2500);
}

// Start quiz
function startQuiz(type) {
  currentQuizType = type;
  currentQuestionIndex = 0;
  quizAnswers = [];

  document.getElementById('quizSelection').style.display = 'none';
  document.getElementById('quizContent').style.display = 'block';
  document.getElementById('totalQ').textContent = quizData[type].questions.length;

  loadQuestion();
}

// Load quiz question
function loadQuestion() {
  const quiz = quizData[currentQuizType];
  const question = quiz.questions[currentQuestionIndex];

  document.getElementById('currentQ').textContent = currentQuestionIndex + 1;
  document.getElementById('questionText').textContent = question.question;

  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  document.getElementById('quizProgress').textContent = Math.round(progress) + '%';
  document.getElementById('quizProgressBar').style.width = progress + '%';

  const optionsContainer = document.getElementById('optionsContainer');
  optionsContainer.innerHTML = '';

  question.options.forEach((option, index) => {
    const optionDiv = document.createElement('div');
    optionDiv.className = 'quiz-option';
    optionDiv.innerHTML = `<span style="font-weight: 500;">${option}</span>`;
    optionDiv.onclick = () => selectOption(optionDiv, index);
    optionsContainer.appendChild(optionDiv);
  });

  document.getElementById('nextBtn').disabled = true;
  document.getElementById('nextBtn').style.opacity = '0.5';
}

// Select quiz option
function selectOption(element, value) {
  document.querySelectorAll('.quiz-option').forEach(opt => {
    opt.classList.remove('selected');
  });
  element.classList.add('selected');

  quizAnswers[currentQuestionIndex] = value;

  document.getElementById('nextBtn').disabled = false;
  document.getElementById('nextBtn').style.opacity = '1';
}

// Next question
function nextQuestion() {
  const quiz = quizData[currentQuizType];

  if (currentQuestionIndex < quiz.questions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  } else {
    showQuizResults();
  }
}

// Show quiz results
function showQuizResults() {
  document.getElementById('quizContent').style.display = 'none';
  document.getElementById('quizResult').style.display = 'block';

  // Calculate risk based on answers
  const avgScore = quizAnswers.reduce((a, b) => a + b, 0) / quizAnswers.length;

  let riskLevel, riskClass, riskText, recommendations;

  if (avgScore < 1.5) {
    riskLevel = 'LOW RISK';
    riskClass = 'risk-low';
    riskText = 'Based on your responses, your risk level is currently low. Keep maintaining a healthy lifestyle!';
    recommendations = [
      'Continue regular exercise routine',
      'Maintain balanced diet',
      'Get annual check-ups',
      'Monitor stress levels'
    ];
  } else if (avgScore < 2.5) {
    riskLevel = 'MODERATE RISK';
    riskClass = 'risk-medium';
    riskText = 'Your responses indicate a moderate risk level. Consider making some lifestyle improvements.';
    recommendations = [
      'Increase physical activity',
      'Improve diet quality',
      'Schedule regular health screenings',
      'Reduce stress through relaxation techniques',
      'Consult with a healthcare provider'
    ];
  } else {
    riskLevel = 'HIGH RISK';
    riskClass = 'risk-high';
    riskText = 'Your responses suggest a higher risk level. It is recommended to consult with a healthcare professional soon.';
    recommendations = [
      'Schedule an appointment with your doctor',
      'Begin a supervised exercise program',
      'Work with a nutritionist for diet planning',
      'Consider medication if prescribed',
      'Regular health monitoring is essential'
    ];
  }

  document.getElementById('riskBadge').textContent = riskLevel;
  document.getElementById('riskBadge').className = 'risk-badge ' + riskClass;
  document.getElementById('resultText').textContent = riskText;

  const recList = document.getElementById('recommendationsList');
  recList.innerHTML = '';
  recommendations.forEach(rec => {
    const li = document.createElement('li');
    li.style.margin = '8px 0';
    li.textContent = rec;
    recList.appendChild(li);
  });
}

// Reset quiz
function resetQuiz() {
  document.getElementById('quizResult').style.display = 'none';
  document.getElementById('quizSelection').style.display = 'block';
  currentQuizType = '';
  currentQuestionIndex = 0;
  quizAnswers = [];
}
