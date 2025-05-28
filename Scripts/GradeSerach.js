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
      <div class="bg-white shadow-lg rounded-lg p-6 w-full max-w-xl">
        <table class="min-w-full text-left text-sm border border-gray-200">
          <tbody>
            <tr class="bg-gray-100">
              <th class="py-2 px-4 font-semibold text-gray-700">Name</th>
              <td class="py-2 px-4">${student.name}</td>
            </tr>
            <tr>
              <th class="py-2 px-4 font-semibold text-gray-700">Class</th>
              <td class="py-2 px-4">${student.class}</td>
            </tr>
            <tr class="bg-gray-100">
              <th colspan="2" class="py-2 px-4 text-center font-semibold text-gray-800">Grades</th>
            </tr>
            <tr>
              <td class="py-2 px-4">Math</td>
              <td class="py-2 px-4">${Math}</td>
            </tr>
            <tr>
              <td class="py-2 px-4">English</td>
              <td class="py-2 px-4">${English}</td>
            </tr>
            <tr>
              <td class="py-2 px-4">Science</td>
              <td class="py-2 px-4">${Science}</td>
            </tr>
            <tr class="bg-gray-100">
              <th class="py-2 px-4 text-gray-700">GPA</th>
              <td class="py-2 px-4 font-bold text-purple-700">${gpa}</td>
            </tr>
          </tbody>
        </table>

        <div class="flex justify-center mt-4">
          <button id="downloadBtn" class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full shadow-md transition-all">
            <i class="fas fa-download mr-2"></i>Download PDF
          </button>

        </div>
      
       

        <p class="text-center text-gray-500 mt-3 italic">Wishing you all the best!</p>
      </div>
    `;

    document.querySelector('#downloadBtn').addEventListener('click', () => {
      downloadGrades(student);
    });
document.querySelector('#Logout').addEventListener('click',()=>{
  window.location.href='index.html'
})

  } else {
    results.innerHTML = `<p class="text-red-500 font-semibold text-center">Student not found</p>`;
  }
}


function downloadGrades(student) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Title
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Student Grade Report", 105, 20, { align: "center" });

  // Student Info
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Name: ${student.name}`, 20, 35);
  doc.text(`ID: ${student.id}`, 20, 45);
  doc.text(`Class: ${student.class}`, 20, 55);

  // Table Headers
  doc.setFont("helvetica", "bold");
  doc.setFillColor(230, 230, 250); // light purple
  doc.rect(20, 70, 170, 10, 'F'); // header background
  doc.text("Subject", 30, 77);
  doc.text("Score", 100, 77);
  doc.text("GPA", 150, 77);

  // Table Rows
  const grades = student.grades;
  const calculateGPA = (score) => {
    if (score >= 90) return 4.0;
    if (score >= 80) return 3.0;
    if (score >= 70) return 2.0;
    if (score >= 60) return 1.0;
    return 0.0;
  };

  const rows = [
    { subject: "Math", score: grades.math, gpa: calculateGPA(parseInt(grades.math)) },
    { subject: "English", score: grades.English, gpa: calculateGPA(parseInt(grades.English)) },
    { subject: "Science", score: grades.Science, gpa: calculateGPA(parseInt(grades.Science)) },
  ];

  doc.setFont("helvetica", "normal");
  let y = 87;
  rows.forEach(row => {
    doc.text(row.subject, 30, y);
    doc.text(String(row.score), 100, y);
    doc.text(String(row.gpa.toFixed(1)), 150, y);
    y += 10;
  });

  // Average GPA
  const avgGPA = ((rows.reduce((sum, r) => sum + r.gpa, 0)) / rows.length).toFixed(2);
  doc.setFont("helvetica", "bold");
  doc.text(`Average GPA: ${avgGPA}`, 20, y + 10);

  // Footer
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.text("Generated by ILAYS SCHOOL 2025", 105, 285, { align: "center" });

  // Save PDF
  doc.save(`${student.name}_Grade_Report.pdf`);
}


const Logout =document.querySelector('#Logout').addEventListener('click',()=>{
  window.location.href='index.html'
})