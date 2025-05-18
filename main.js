const forminput = document.querySelector('#forminput');
const inputsearch = document.querySelector('#searchArea');





forminput.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputValue = inputsearch.value.trim();

  if (inputValue !== "") {
    SearchGrade(inputValue);
    saveToLocalStorage(inputValue);
  }
});

async function SearchGrade(id) {
  const results = document.querySelector('.result');
  results.innerHTML = ""; 

  try {
    const response = await fetch('../public/grade.json');
    const data = await response.json();

    const student = data.find(student => student.id === id);
    if (student) {
        const { Math, English, Science } = student.grades;
      
       
        const calculateGPA = (score) => {
          if (score >= 90) return 4.0;
          if (score >= 80) return 3.0;
          if (score >= 70) return 2.0;
          if (score >= 60) return 1.0;
          return 0.0;
        };
      
        const gpaMath = calculateGPA(Math);
        const gpaEnglish = calculateGPA(English);
        const gpaScience = calculateGPA(Science);
      
        const gpa = ((gpaMath + gpaEnglish + gpaScience) / 3).toFixed(2);
      
        results.innerHTML += `
          <div class="container">
            <table border="1" cellpadding="10" cellspacing="0">
              <tr>
                <th>Name</th>
                <td>${student.name}</td>
              </tr>
              <tr>
                <th>Class</th>
                <td>${student.class}</td>
              </tr>
              <tr>
                <th colspan="2">Grades</th>
              </tr>
              <tr>
                <td>Math</td>
                <td>${Math}</td>
              </tr>
              <tr>
                <td>English</td>
                <td>${English}</td>
              </tr>
              <tr>
                <td>Science</td>
                <td>${Science}</td>
              </tr>
              <tr>
                <th>GPA</th>
                <td><strong>${gpa}</strong></td>
              </tr>
            </table>
             <button id="downloadBtn">Download PDF</button>
          </div>
        `;
     
        const downloadBtn = document.querySelector('#downloadBtn');
  downloadBtn.addEventListener('click', () => {
    downloadGrades(student);
  });
    } else {
      results.innerHTML = `<p class="container">Student not found</p>`;
    }
  } catch (error) {
    results.innerHTML = `<p class="container ">Error loading student data</p>`;
    console.error("Error:", error);
  }
}


async function downloadGrades(student) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
    let content = `

  
  Name: ${student.name}
  Class: ${student.class}
  
  Grades:
   Math: ${student.grades.Math}
  English: ${student.grades.English}
   Science: ${student.grades.Science}
  `;
  
    doc.text(content, 10, 10);
    doc.save(`${student.name}_grades.pdf`);
  }
  

function saveToLocalStorage(id) {
  const stored = JSON.parse(localStorage.getItem('searchHistory')) || [];
  if (!stored.includes(id)) {
    stored.push(id);
    localStorage.setItem('searchHistory', JSON.stringify(stored));
  }
}




function SetError(element, message) {
  element.classList.add('invalid')
  element.classList.remove('valid')
  error.textContent = message 
}

function Setsuccess(element) {
  element.classList.add('valid')
  element.classList.remove('invalid')
}
