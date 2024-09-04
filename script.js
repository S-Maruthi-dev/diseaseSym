document.getElementById('startGame').addEventListener('click', function() {
    const studentName = document.getElementById('studentName').value.trim();
    const difficulty = document.getElementById('difficulty').value;

    if (studentName === '') {
        alert('Please enter your name.');
        return;
    }

    if (difficulty === '') {
        alert('Please select a game mode.');
        return;
    }

    // Redirect to the appropriate HTML page based on difficulty
    window.location.href = `${difficulty}.html?name=${encodeURIComponent(studentName)}`;
    
    window.location.href = `${difficulty}.html?input=${encodeURIComponent(studentName)}`;


});
