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
        name: 'sirah soola',
        symptoms: ['sirah spandanam', 'chakshu nimilanam', 'Avakujanam', 'Arati','swapna nasha','siroruja'],
        wrongSymptoms: ['Headache', 'Rash', 'Stomachache']
    },
    {
        name: 'Karna Vedana',
        symptoms: ['karna sparsha with Hasti', 'Siro Bramanam', 'Arati', 'Arachakam','Aswapna'],
        wrongSymptoms: ['Fever', 'Chest pain', 'Shortness of breath']
    },
    // Add more diseases and their symptoms as needed
    {
        name: 'THUkha roga',
        symptoms: ['Laala Sravanam Atyartam', 'stana dwesha', 'Arati', 'kshira Udgirinam','Nasa swasa'],
        wrongSymptoms: ['Headache', 'Rash', 'Stomachache']
    },
    {
        name: 'kanta Vedana',
        symptoms: ['stanya udgirinam', 'Vistambam', 'sleshma sevanam', 'jwara','Aruchi', 'Glani'],
        wrongSymptoms: ['Headache', 'Rash', 'Stomachache']
    },


];

let currentDiseaseIndex = 0;
let correctSymptoms = [];
let wrongSymptoms = [];

const diseaseNameElement = document.getElementById('disease-name');
const symptomsContainer = document.getElementById('symptoms-container');
const dropArea = document.getElementById('drop-area');
const feedbackElement = document.getElementById('feedback');
const nextButton = document.getElementById('next-btn');
const droppedList = document.getElementById('dropped-list');
const wrongList = document.getElementById('wrong-list');
var audi = document.getElementById('audio2');
var aud = document.getElementById('audio3');
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
    allSymptoms.forEach(symptom => {
        const symptomElement = document.createElement('div');
        symptomElement.textContent = symptom;
        symptomElement.className = 'symptom';
        symptomElement.draggable = true;
        symptomElement.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', symptom);
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
        if (disease.symptoms.includes(droppedSymptom)) {
            feedbackElement.textContent = 'Correct!';
             audi.play();
            feedbackElement.className = 'correct';
           
            if (!correctSymptoms.includes(droppedSymptom)) {
                correctSymptoms.push(droppedSymptom);
                const listItem = document.createElement('li');
                listItem.textContent = droppedSymptom;
                droppedList.appendChild(listItem);
            }
            disease.symptoms = disease.symptoms.filter(symptom => symptom !== droppedSymptom);
            if (disease.symptoms.length === 0) {
                feedbackElement.textContent = 'Well done! Click Next to continue.';
                feedbackElement.className = 'correct';
               
                nextButton.disabled = false;
            }
        } else {
            feedbackElement.textContent = 'Wrong! Try again.';
           
            feedbackElement.className = '';
           if (!wrongSymptoms.includes(droppedSymptom)) {
                wrongSymptoms.push(droppedSymptom);
                const listItem = document.createElement('li');
                listItem.textContent = droppedSymptom;
               // wrongList.appendChild(listItem);
            } 
        }
    });
}

nextButton.addEventListener('click', () => {
    if (currentDiseaseIndex < diseases.length - 1) {
        currentDiseaseIndex++;
        loadDisease(currentDiseaseIndex);
        nextButton.disabled = true;
        

    } else {
        feedbackElement.textContent = 'Game Over! You have completed all diseases.';
        stopTimer();
        updateTimerDisplay();
        feedbackElement.className = 'correct';
        nextButton.style.display = 'none';
    }
});

// Initialize the game
loadDisease(currentDiseaseIndex);
