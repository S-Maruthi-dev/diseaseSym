document.getElementById('startGame').addEventListener('click', function() {
    const studentName = document.getElementById('studentName').value.trim();
    const difficulty = document.getElementById('difficulty').value;
    const symptomMode = document.getElementById('symptomM').value;
    var audio = document.getElementById("audio1");
    audio.play();

    if (studentName === '') {
        alert('Please enter your name.');
        return;
    }

    if (difficulty === '') {
        alert('Please select a game mode.');
        return;
    }
    
    if(symptomMode === ''){
        alert('Please select a Symptom mode.');
        return;
    }
    // Redirect to the appropriate HTML page based on difficulty
   // window.location.href = `${difficulty}.html?name=${encodeURIComponent(studentName)}`;
    
  //  window.location.href = `${difficulty}.html?input=${encodeURIComponent(studentName)}`;
    
    if(difficulty == "easy" && symptomMode == "word"){
        window.location.href = `index2.html?name=${encodeURIComponent(studentName)}`;
    
        window.location.href = `index2.html?input=${encodeURIComponent(studentName)}`;
    }
    else if(difficulty == "easy" && symptomMode == "image"){
        window.location.href = `image.html?name=${encodeURIComponent(studentName)}`;
    
        window.location.href = `image.html?input=${encodeURIComponent(studentName)}`;
    }
    else if(difficulty == "medium" && symptomMode == "word"){
        window.location.href = `index3.html?name=${encodeURIComponent(studentName)}`;
    
        window.location.href = `index3.html?input=${encodeURIComponent(studentName)}`;
    }
    else if(difficulty == "medium" && symptomMode == "image"){
        window.location.href = `image2.html?name=${encodeURIComponent(studentName)}`;
    
        window.location.href = `image2.html?input=${encodeURIComponent(studentName)}`;
    }
    else if(difficulty == "hard" && symptomMode == "word"){
        window.location.href = `index4.html?name=${encodeURIComponent(studentName)}`;
    
        window.location.href = `index4.html?input=${encodeURIComponent(studentName)}`;
    }
    else if(difficulty == "hard" && symptomMode == "image"){
        window.location.href = `image3.html?name=${encodeURIComponent(studentName)}`;
    
        window.location.href = `image3.html?input=${encodeURIComponent(studentName)}`;
    }

});
