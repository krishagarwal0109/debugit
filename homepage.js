
        function redirectToCourses() {
            var role = prompt('Are you a student or a teacher?\nEnter "student" or "teacher"');
            if (role === 'student') {
                window.location.href = 'courses.html'; // Redirect to courses.html with role=student
            } else if (role === 'teacher') {
                var password = prompt('Enter password:');
                if (password === 'debugit') {
                    window.location.href = 'courses.html?role=teacher'; // Redirect to courses.html with role=teacher
                } else {
                    alert('Incorrect password. Please try again.');
                    window.location.href = 'homepage.html'; // Redirect to homepage
                }
            } else {
                alert('Invalid role. Please enter "student" or "teacher".');
            }
        }
            function redirectToDoubts() {
                var role = prompt('Are you a student or a teacher?\nEnter "student" or "teacher"');
                if (role === 'student') {
                    window.location.href = 'doubts.html?role=student'; // Redirect to courses.html with role=student
                } else if (role === 'teacher') {
                    var password = prompt('Enter password:');
                    if (password === 'debugit') {
                        window.location.href = 'doubts.html?role=teacher'; // Redirect to courses.html with role=teacher
                    } else {
                        alert('Incorrect password. Please try again.');
                        window.location.href = 'homepage.html'; // Redirect to homepage
                    }
                } else {
                    alert('Invalid role. Please enter "student" or "teacher".');
                }
            }