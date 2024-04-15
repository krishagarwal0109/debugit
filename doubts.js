function getRole() {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('role');
}

function addDoubt() {
    var role = getRole();
    var doubtContent = document.getElementById('doubtContent').value;
    
    if (role && role.toLowerCase() === 'student') {
        if (doubtContent.trim() !== '') {
            var doubts = JSON.parse(localStorage.getItem('doubts')) || [];
            doubts.push({ content: doubtContent, answered: false });
            localStorage.setItem('doubts', JSON.stringify(doubts));
            displayDoubts();
            document.getElementById('doubtContent').value = ''; // Clear the input field
        } else {
            alert('Please enter your doubt.');
        }
    } else if (role && role.toLowerCase() === 'teacher') {
        alert('Teachers cannot add doubts.');
    } else {
        alert('Invalid role.');
    }
}

function answerDoubt(index) {
    var answer = prompt('Enter your answer:');
    if (answer !== null && answer.trim() !== '') {
        var doubts = JSON.parse(localStorage.getItem('doubts')) || [];
        doubts[index].answered = true;
        doubts[index].answer = answer;
        localStorage.setItem('doubts', JSON.stringify(doubts));
        displayDoubts();
        displaySolvedDoubts();
    }
}

function displayDoubts() {
    var doubts = JSON.parse(localStorage.getItem('doubts')) || [];
    var role = getRole();
    
    var doubtsList = document.getElementById('doubtsList');
    doubtsList.innerHTML = '';
    
    doubts.forEach(function (doubt, index) {
        if (!doubt.answered) {
            var li = document.createElement('li');
            li.textContent = doubt.content;
            
            if (role && role.toLowerCase() === 'teacher') {
                var answerButton = document.createElement('button');
                answerButton.textContent = 'Answer Doubt';
                answerButton.onclick = function() {
                    answerDoubt(index);
                };
                li.appendChild(answerButton);
            }
            
            doubtsList.appendChild(li);
        }
    });
}

function displaySolvedDoubts() {
    var doubts = JSON.parse(localStorage.getItem('doubts')) || [];
    var role = getRole();
    
    var solvedDoubtsList = document.getElementById('solvedDoubtsList');
    solvedDoubtsList.innerHTML = '';
    
    doubts.forEach(function (doubt) {
        if (doubt.answered) {
            var li = document.createElement('li');
            li.textContent = 'Doubt: ' + doubt.content + ' - Answer: ' + doubt.answer;
            solvedDoubtsList.appendChild(li);
        }
    });
}

window.onload = function () {
    var role = getRole();
    if (role && role.toLowerCase() === 'teacher') {
        document.getElementById('addDoubtSection').style.display = 'none';
    }
    
    displayDoubts();
    displaySolvedDoubts();
};


