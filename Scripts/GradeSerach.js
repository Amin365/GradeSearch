const forminput = document.querySelector('#forminput');
const inputsearch = document.querySelector('#searchArea');

forminput.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputValue = inputsearch.value.trim();

  if (inputValue !== "") {
    SearchGrade(inputValue);
    
  }
});

function SearchGrade(id) {
  const results = document.querySelector('.result');
  results.innerHTML = "";

  const data = JSON.parse(localStorage.getItem('students')) || [];
  const student = data.find(student => student.id === id);

  if (student) {
    const { math: Math, English, Science } = student.grades;

    const calculateGPA = (score) => {
      if (score >= 90) return 4.0;
      if (score >= 80) return 3.0;
      if (score >= 70) return 2.0;
      if (score >= 60) return 1.0;
      return 0.0;
    };

    const gpaMath = calculateGPA(parseInt(Math));
    const gpaEnglish = calculateGPA(parseInt(English));
    const gpaScience = calculateGPA(parseInt(Science));

    const gpa = ((gpaMath + gpaEnglish + gpaScience) / 3).toFixed(2);

    results.innerHTML = `
      <div class="container">
        <table border="1" cellpadding="10" cellspacing="0">
          <tr><th>Name</th><td>${student.name}</td></tr>
          <tr><th>Class</th><td>${student.class}</td></tr>
          <tr><th colspan="2">Grades</th></tr>
          <tr><td>Math</td><td>${Math}</td></tr>
          <tr><td>English</td><td>${English}</td></tr>
          <tr><td>Science</td><td>${Science}</td></tr>
          <tr><th>GPA</th><td><strong>${gpa}</strong></td></tr>
        </table>
        <button id="downloadBtn">Download PDF</button>
      </div>
    `;

    document.querySelector('#downloadBtn').addEventListener('click', () => {
      downloadGrades(student);
    });

  } else {
    results.innerHTML = `<p class="container">Student not found</p>`;
  }
}

function downloadGrades(student) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  let content = `
Name: ${student.name}
Class: ${student.class}

Grades:
Math: ${student.grades.math}
English: ${student.grades.English}
Science: ${student.grades.Science}
  `;

  doc.text(content, 10, 10);
  doc.save(`${student.name}_grades.pdf`);
}

const TogelMode = document.querySelector('.togle-mode');

// On click, toggle mode
TogelMode.addEventListener('click', () => {
  switchModel();
});

function switchModel() {
  document.body.classList.toggle('dark-mode');
  TogelMode.classList.toggle('dark-mode');

  if (document.body.classList.contains('dark-mode')) {
    TogelMode.innerHTML = `<i class="fa-solid fa-sun"></i>`;
    localStorage.setItem('mode', 'dark');  // Save as dark
  } else {
    TogelMode.innerHTML = `<i class="fa-solid fa-moon"></i>`;
    localStorage.setItem('mode', 'light'); // Save as light ✅ FIXED HERE
  }
}

// On page load, set saved mode
window.addEventListener('DOMContentLoaded', () => {
  const savedMode = localStorage.getItem('mode');

  if (savedMode === 'dark') {
    document.body.classList.add('dark-mode');
    TogelMode.classList.add('dark-mode');
    TogelMode.innerHTML = `<i class="fa-solid fa-sun"></i>`;
  } else {
    // Light mode is default
    document.body.classList.remove('dark-mode');
    TogelMode.classList.remove('dark-mode');
    TogelMode.innerHTML = `<i class="fa-solid fa-moon"></i>`;
  }
});



