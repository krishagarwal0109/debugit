function addCourse() {
    var courseName = document.getElementById('courseName').value;
    if (courseName.trim() !== '') {
        var courses = JSON.parse(localStorage.getItem('courses')) || [];
        courses.push(courseName);
        localStorage.setItem('courses', JSON.stringify(courses));
        displayCourses();
        broadcastCourseUpdate(courseName);
        document.getElementById('courseName').value = ''; // Clear the input field
    } else {
        alert('Please enter a course name.');
    }
}

function enrollCourse(courseName) {
    var enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
    if (!enrolledCourses.includes(courseName)) {
        enrolledCourses.push(courseName);
        localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
        displayEnrolledCourses();
        displayCourses(); // Update available courses list to remove enroll option
    }
}

function unenrollCourse(courseName) {
    var enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
    var index = enrolledCourses.indexOf(courseName);
    if (index !== -1) {
        enrolledCourses.splice(index, 1);
        localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
        displayEnrolledCourses();
        displayCourses(); // Update available courses list to show enroll option
    }
}

function removeCourse(courseName) {
    var courses = JSON.parse(localStorage.getItem('courses')) || [];
    var index = courses.indexOf(courseName);
    if (index !== -1) {
        courses.splice(index, 1);
        localStorage.setItem('courses', JSON.stringify(courses));
        displayCourses();
        broadcastCourseUpdateRemoved(courseName);
    }
}

function displayCourses() {
    var courses = JSON.parse(localStorage.getItem('courses')) || [];
    var enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
    var coursesList = document.getElementById('coursesList');
    coursesList.innerHTML = '';
    courses.forEach(function(course) {
        if (!enrolledCourses.includes(course)) {
            var li = document.createElement('li');
            li.textContent = course;
            if (!isTeacher()) {
                var enrollButton = document.createElement('button');
                enrollButton.textContent = 'Enroll';
                enrollButton.onclick = function() {
                    enrollCourse(course);
                    li.remove(); // Remove the course from available courses after enrolling
                };
                li.appendChild(enrollButton);
            } else {
                var editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.onclick = function() {
                    console.log('Edit course:', course);
                    // Implement edit course functionality
                };
                li.appendChild(editButton);

                var addAssignmentButton = document.createElement('button');
                addAssignmentButton.textContent = 'Add Assignment';
                addAssignmentButton.onclick = function() {
                    console.log('Add assignment for course:', course);
                    // Implement add assignment functionality
                };
                li.appendChild(addAssignmentButton);

                var addResourcesButton = document.createElement('button');
                addResourcesButton.textContent = 'Add Resources';
                addResourcesButton.onclick = function() {
                    console.log('Add resources for course:', course);
                    // Implement add resources functionality
                };
                li.appendChild(addResourcesButton);

                var removeButton = document.createElement('button');
                removeButton.textContent = 'Remove';
                removeButton.onclick = function() {
                    removeCourse(course);
                };
                li.appendChild(removeButton);
            }
            coursesList.appendChild(li);
        }
    });
}

function displayEnrolledCourses() {
    var enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
    var enrolledCoursesList = document.getElementById('enrolledCoursesList');
    enrolledCoursesList.innerHTML = '';
    enrolledCourses.forEach(function(course) {
        var li = document.createElement('li');
        li.textContent = course;
        if (!isTeacher()) {
            var unenrollButton = document.createElement('button');
            unenrollButton.textContent = 'Unenroll';
            unenrollButton.onclick = function() {
                unenrollCourse(course);
            };
            li.appendChild(unenrollButton);
        }
        enrolledCoursesList.appendChild(li);
    });
}

function broadcastCourseUpdate(courseName) {
    var courseUpdateEvent = new CustomEvent('courseUpdate', { detail: courseName });
    window.dispatchEvent(courseUpdateEvent);
}

function broadcastCourseUpdateRemoved(courseName) {
    var courseUpdateRemovedEvent = new CustomEvent('courseUpdateRemoved', { detail: courseName });
    window.dispatchEvent(courseUpdateRemovedEvent);
}

function isTeacher() {
    var urlParams = new URLSearchParams(window.location.search);
    var role = urlParams.get('role');
    return role === 'teacher';
}

window.onload = function() {
    displayCourses();
    if (!isTeacher()) {
        displayEnrolledCourses();
        document.getElementById('enrolledCoursesSection').style.display = 'block';
    }
    // Determine if the user is a teacher or student based on URL parameter
    var urlParams = new URLSearchParams(window.location.search);
    var role = urlParams.get('role');

    // If the role is 'teacher', show the Add Course section
    if (role === 'teacher') {
        document.getElementById('addCourseSection').style.display = 'block';
    }
};

