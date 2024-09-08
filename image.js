// Function to get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Retrieve the input parameter and display it
const userInput = getUrlParameter('input');
document.getElementById('displayText').textContent = userInput ? decodeURIComponent(userInput) : 'No input provided';

document.getElementById("next-btn").addEventListener("click", function() {
    var audio = document.getElementById("audio1");
    audio.play();
});

let timerInterval;
let seconds = 0;
let isRunning = false;

function updateTimerDisplay() {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    document.getElementById('timer').textContent = 
        String(hours).padStart(2, '0') + ':' + 
        String(minutes).padStart(2, '0') + ':' + 
        String(secs).padStart(2, '0');
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(() => {
            seconds++;
            updateTimerDisplay();
        }, 1000);
    }
}

function stopTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
    }
}

startTimer();

const diseases = [
    {
        name: 'sirah spandanam',
        symptoms: ['i1.jpg','i2.jpg','i3.jpg'],
        wrongSymptoms: ['i4.jpg','i5.jpg','i6.jpg']
    },
    {
        name: 'Karna Vedana',
        symptoms: [ 'i8.jpg','i5.jpg','i2.jpg'],
        wrongSymptoms: ['i4.jpg','i1.jpg']
    }
    
];

let currentDiseaseIndex = 0;
let correctSymptoms = [];
let wrongSymptoms = [];
const numberOfDiseases = diseases.length;
document.getElementById('qn').textContent = numberOfDiseases;
let skipCount = 0; 
let answeredCount = 0;
let score = 0.0;

const diseaseNameElement = document.getElementById('disease-name');
const symptomsContainer = document.getElementById('symptoms-container');
const dropArea = document.getElementById('drop-area');
const feedbackElement = document.getElementById('feedback');
const nextButton = document.getElementById('next-btn');
const skipButton = document.getElementById('Skip');
const droppedList = document.getElementById('dropped-list');
const wrongList = document.getElementById('wrong-list');
const audi = document.getElementById('audio2');
const aud = document.getElementById('audio3');

function loadDisease(diseaseIndex) {
    const disease = diseases[diseaseIndex];
    diseaseNameElement.textContent = disease.name;
    symptomsContainer.innerHTML = '';
    dropArea.innerHTML = '';
    feedbackElement.textContent = '';
    droppedList.innerHTML = '';
    wrongList.innerHTML = '';

    correctSymptoms = [];
    wrongSymptoms = [];  
    
    



    // Create draggable symptoms
    const allSymptoms = [...disease.symptoms, ...disease.wrongSymptoms];
    const shuffledSymptoms = allSymptoms.sort(() => Math.random() - 0.5);

    shuffledSymptoms.forEach((symptom, index) => {
        const symptomElement = document.createElement('img');
        symptomElement.src = `images/${symptom}`; // Set the src attribute for the image
        symptomElement.className = 'symptom';
        symptomElement.id = `${index}`;
        symptomElement.draggable = true;
    
        symptomElement.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', symptom);
        });

          // Prevent right-click to disable download option
        symptomElement.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });        
    
        symptomsContainer.appendChild(symptomElement);
    });
    

    // Set up drop area
    dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        const droppedSymptom = e.dataTransfer.getData('text/plain');
        
         // Remove the symptom from the symptoms container
         const items = symptomsContainer.querySelectorAll('img');
         items.forEach(item => {
             if (item.src.includes(droppedSymptom)) { // Check if the src includes the dropped symptom
                 symptomsContainer.removeChild(item);
             }
         });

        if (disease.symptoms.includes(droppedSymptom)) {
            feedbackElement.textContent = 'Correct!';
            audi.play();
            feedbackElement.className = 'correct';

            // Update the score for a correct answer
            score += 0.1;
            document.getElementById('rem').textContent = score.toFixed(1);

            if (!correctSymptoms.includes(droppedSymptom)) {
                correctSymptoms.push(droppedSymptom);
                const listItem = document.createElement('li');
                listItem.textContent = droppedSymptom;
               // droppedList.appendChild(listItem);
            }
            disease.symptoms = disease.symptoms.filter(symptom => symptom !== droppedSymptom);
            if (disease.symptoms.length === 0) {
                feedbackElement.textContent = 'Well done! Click Next to continue.';
                feedbackElement.className = 'correct';
                answeredCount++;
                document.getElementById('an').textContent = answeredCount;
                nextButton.disabled = false;
                skipButton.disabled = true;
            }
        } else if(disease.wrongSymptoms.includes(droppedSymptom)) {
            feedbackElement.textContent = 'Wrong! Try again.';
            feedbackElement.className = '';
            aud.play();
            // Update the score for a wrong answer
            score -= 0.1;
            document.getElementById('rem').textContent = score.toFixed(1);
            
            if (!wrongSymptoms.includes(droppedSymptom)) {
                wrongSymptoms.push(droppedSymptom);
                const listItem = document.createElement('li');
                listItem.textContent = droppedSymptom;
              //  wrongList.appendChild(listItem);
                
            } 
        }
    });
}

nextButton.addEventListener('click', () => {
    if (currentDiseaseIndex < diseases.length - 1) {
        currentDiseaseIndex++;
        loadDisease(currentDiseaseIndex);
        nextButton.disabled = true;
        skipButton.disabled = false;
    } else {
        feedbackElement.textContent = 'Excellent! You completed the Easy Level. Now play the Medium Level ->> click on the Home button';
        stopTimer();
        updateTimerDisplay();
        document.getElementById('tna').textContent = "Time Taken: ";
        feedbackElement.className = 'correct';
        nextButton.style.display = 'none';
    }
});

// Function to handle skipping the current disease
skipButton.addEventListener('click', () => {
    skipCount++; // Increment the skip counter
    
    
    document.getElementById('sn').textContent = skipCount;  
    
    // Move to the next disease
    if (currentDiseaseIndex < diseases.length - 1) {
        currentDiseaseIndex++;
        loadDisease(currentDiseaseIndex);
        nextButton.disabled = true; // Disable the next button until the user completes the task
        feedbackElement.textContent = ''; // Clear feedback
    } else {
        // If there are no more diseases to skip to
        feedbackElement.textContent = 'You have reached the end of the list!';
        stopTimer();
        updateTimerDisplay();
        document.getElementById('tna').textContent = "Time Taken: ";
        skipButton.style.display = 'none'; // Hide the skip button
    }
});

// Initialize the game
loadDisease(currentDiseaseIndex);
