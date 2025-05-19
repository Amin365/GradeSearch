const students = JSON.parse(localStorage.getItem("students")) || [];
const totalStudentElement = document.querySelector(".listStudent");
totalStudentElement.textContent = students.length;


const subjects = JSON.parse(localStorage.getItem('students')) || [];


// Calculate total subjects
let totalSubjects = 0;

subjects.forEach((student) => {
    if (student.grades && typeof student.grades === "object") {
        totalSubjects += Object.keys(student.grades).length;
    }
});


const subjectCountElement = document.querySelector(".subjects");
subjectCountElement.textContent = `${totalSubjects} / per student 3 subject`;

// calcualte the number of student passed or failed

const student = JSON.parse(localStorage.getItem('students')) || [];

let passedCount = 0;
let failedCount = 0;

student.forEach((student) => {
    const grades = student.grades;

    if (grades && typeof grades === "object") {
        const marks = Object.values(grades).map(mark => Number(mark.trim()));
        console.log(marks)
        const total = marks.reduce((sum, val) => sum + val, 0);
        const avg = total / marks.length;

        if (avg >= 50) {
            passedCount++;
        } else {
            failedCount++;
        }
    }
});

// Display results in the dashboard
document.querySelector(".mark").textContent = passedCount;
document.querySelector(".lowmark").textContent = failedCount;



const totalStudents = students.length;

// PIE CHART (Students vs Subjects)
const ctxPie = document.getElementById('studentPieChart');
if (ctxPie) {
  new Chart(ctxPie, {
    type: 'pie',
    data: {
      labels: ['Total Students', 'Total Subjects'],
      datasets: [{
        data: [totalStudents, totalSubjects],
        backgroundColor: ['#36A2EB', '#FFCE56'],
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Total Students vs Subjects'
        }
      }
    }
  });
}

// BAR CHART (Passed vs Failed)
const ctxBar = document.getElementById('studentBarChart');
if (ctxBar) {
  new Chart(ctxBar, {
    type: 'bar',
    data: {
      labels: ['Passed', 'Failed'],
      datasets: [{
        label: 'Student Performance',
        data: [passedCount, failedCount],
        backgroundColor: ['#4CAF50', '#F44336'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Passed vs Failed Students'
        }
      }
    }
  });
}