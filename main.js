// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });

  reloadTable();
});

// UI Toggles
const gradesBtn = document.querySelector('.Grade');
const registersection = document.querySelector('.register');
const heroes = document.querySelectorAll('.hero');
const homeBtn = document.querySelector('.Homes');
const viewBtn = document.querySelector('.ViewGrade');
const loginBtn = document.querySelector('.login');

homeBtn.addEventListener('click', () => {
  registersection.classList.add('hidden');
  document.querySelector('.view').classList.add('hidden'); // Ensure view is hidden
  heroes.forEach(btn => btn.classList.remove('hidden'));
   UserRegister.classList.add('hidden')
});

gradesBtn.addEventListener('click', () => {
  registersection.classList.remove('hidden');
  heroes.forEach(btn => btn.classList.add('hidden'));
   document.querySelector('.view').classList.add('hidden');
    UserRegister.classList.add('hidden')
});




viewBtn.addEventListener('click', () => {
  registersection.classList.add('hidden');  
  heroes.forEach(btn => btn.classList.add('hidden')); 
  document.querySelector('.view').classList.remove('hidden');
   UserRegister.classList.add('hidden')
});



loginBtn.addEventListener('click', () => {
  window.location.href = 'index.html';
});

// Dashboard Summary
const students = JSON.parse(localStorage.getItem("students")) || [];
document.querySelector(".listStudent").textContent = students.length;

let totalSubjects = 0;
students.forEach(student => {
  if (student.grades && typeof student.grades === "object") {
    totalSubjects += Object.keys(student.grades).length;
  }
});
document.querySelector(".subjects").textContent = `${totalSubjects} / per student 3 subject`;

let passedCount = 0;
let failedCount = 0;
students.forEach(student => {
  const grades = student.grades;
  if (grades && typeof grades === "object") {
    const marks = Object.values(grades).map(mark => Number(mark.trim()));
    console.log(marks)
    const avg = marks.reduce((sum, val) => sum + val, 0) / marks.length;
    if (avg >= 50) passedCount++;
    else failedCount++;
  }
});

document.querySelector(".mark").textContent = passedCount;
document.querySelector(".lowmark").textContent = failedCount;

// Charts
const ctxPie = document.getElementById('studentPieChart');
if (ctxPie) {
  new Chart(ctxPie, {
    type: 'pie',
    data: {
      labels: ['Total Students', 'Total Subjects'],
      datasets: [{
        data: [students.length, totalSubjects],
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
          ticks: { stepSize: 1 }
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

// Modal Logic
const addBtn = document.getElementById('addss');
const modal = document.querySelector('.modal');
const closeBtn = document.getElementById('close-modal');

addBtn.addEventListener('click', () => modal.classList.remove('hidden') );
closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
window.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.add('hidden');
});

// Form Submission
let isUpdating = false;
let updatingStudentId = null;

const newStudentForm = document.querySelector('.newstudnts');
const studentBody = document.querySelector('.studentBody');

newStudentForm.addEventListener('submit', (event) => {
  event.preventDefault();
console.log('hello')
  const name = document.querySelector('#name').value.trim();
  const id = document.querySelector('#id').value.trim();
  const className = document.querySelector('#class').value.trim();
  const math = document.querySelector('#math').value.trim();
  const English = document.querySelector('#English').value.trim();
  const Science = document.querySelector('#science').value.trim();

  if (!name || !id || !className || !math || !English || !Science) {
    alert("Please fill all fields!");
    return;
  }

  const students = JSON.parse(localStorage.getItem('students')) || [];

  if (isUpdating) {
    const index = students.findIndex(s => s.id === updatingStudentId);
    if (index !== -1) {
      students[index] = {
        name,
        id,
        class: className,
        grades: { math, English, Science }
      };
    }
  } else {
    if (students.some(s => s.id === id)) {
      alert("Student with this ID already exists!");
      return;
    }
    students.push({
      name,
      id,
      class: className,
      grades: { math, English, Science }
    });
  }

  localStorage.setItem('students', JSON.stringify(students));
  event.target.reset();
  modal.classList.add('hidden');
  reloadTable();

  isUpdating = false;
  updatingStudentId = null;
});

// Display Table
function reloadTable() {
  const students = JSON.parse(localStorage.getItem('students')) || [];
  studentBody.innerHTML = '';
  students.forEach((student, index) => displayStudentRow(student, index));
}

function displayStudentRow(student, index) {
  const total = parseInt(student.grades.math) + parseInt(student.grades.English) + parseInt(student.grades.Science);
  const avg = (total / 3).toFixed(2);
  const status = avg >= 50 ? 'Pass' : 'Fail';

  const row = document.createElement('tr');
  row.innerHTML = `
    <td class="px-4 py-2 border">${index + 1}</td>
    <td class="px-4 py-2 text-lg border">${student.name}</td>
    <td class="px-4 py-2 border">${student.id}</td>
    <td class="px-4 py-2 border">${student.class}</td>
    <td class="px-4 py-2 border">${student.grades.math}</td>
    <td class="px-4 py-2 border">${student.grades.English}</td>
    <td class="px-4 py-2 border">${student.grades.Science}</td>
    <td class="px-4 py-2 border">${total}</td>
    <td class="px-4 py-2 border">${avg}</td>
    <td class="px-4 py-2 border font-semibold ${avg >= 50 ? 'text-green-600' : 'text-red-600'}">${status}</td>
    <td class="px-4 py-2 border text-center">
      <button class="delete bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
    </td>
    <td class="px-4 py-2 border text-center">
      <button class="update bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">Update</button>
    </td>
  `;

  studentBody.appendChild(row);

  row.querySelector('.delete').addEventListener('click', () => deleteStudent(student.id));
  row.querySelector('.update').addEventListener('click', () => prepareUpdate(student));
}

function prepareUpdate(student) {
  document.querySelector('#name').value = student.name;
  document.querySelector('#id').value = student.id;
  document.querySelector('#class').value = student.class;
  document.querySelector('#math').value = student.grades.math;
  document.querySelector('#English').value = student.grades.English;
  document.querySelector('#science').value = student.grades.Science;

  isUpdating = true;
  updatingStudentId = student.id;
  modal.classList.remove('hidden');
}

function deleteStudent(id) {
  let students = JSON.parse(localStorage.getItem('students')) || [];
  students = students.filter(student => student.id !== id);
  localStorage.setItem('students', JSON.stringify(students));
  reloadTable();
}




// Grade View Table
const view = document.querySelector('.view');
const viewbody = document.querySelector('.view-body');

view.addEventListener('click', () => {
  view.classList.remove('hidden');
  viewbody.innerHTML = '';

  const students = JSON.parse(localStorage.getItem('students')) || [];
  students.forEach((student, index) => {
    const total = parseInt(student.grades.math) + parseInt(student.grades.English) + parseInt(student.grades.Science);
    const avg = (total / 3).toFixed(2);
    const status = avg >= 50 ? 'Pass' : 'Fail';

    const row = document.createElement('tr');
    row.className = "border-b text-center";
    row.innerHTML = `
      <td class="px-4 py-2">${index + 1}</td>
      <td class="px-4 py-2">${student.name}</td>
      <td class="px-4 py-2">${student.class}</td>
      <td class="px-4 py-2">${student.grades.math}</td>
      <td class="px-4 py-2">${student.grades.English}</td>
      <td class="px-4 py-2">${student.grades.Science}</td>
      <td class="px-4 py-2">${avg}</td>
      <td class="px-4 py-2 font-semibold ${avg >= 50 ? 'text-green-600' : 'text-red-600'}">${status}</td>
    `;
    viewbody.appendChild(row);
  });
});


// --- Search Filter for Grade Review ---
const searchInput = document.querySelector('#search-student'); 
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const rows = viewbody.querySelectorAll('tr');
    rows.forEach(row => {
      const nameCell = row.children[1]; // second column is name
      if (nameCell.textContent.toLowerCase().includes(query)) {
        row.classList.remove('hidden');
      } else {
        row.classList.add('hidden');
      }
    });
  });
}


// --- View full student info and export PDF ---
viewbody.addEventListener('click', (e) => {
  const row = e.target.closest('tr');
  if (!row) return;

  const index = row.children[0].textContent - 1;
  const students = JSON.parse(localStorage.getItem('students')) || [];
  const student = students[index];

  if (student) {
    const infoContainer = document.createElement('div');
    infoContainer.className = "px-10 py-5 bg-white rounded shadow-md";
    infoContainer.innerHTML = `
      <h2 class="text-xl font-bold mb-2">Student Information</h2>
      <p class="p-1"><strong>Name:</strong> ${student.name}</p>
      <p class="p-1"><strong>ID:</strong> ${student.id}</p>
      <p class="p-1"><strong>Class:</strong> ${student.class}</p>
      <p class="p-1"><strong>Math:</strong> ${student.grades.math}</p>
      <p class="p-1"><strong>English:</strong> ${student.grades.English}</p>
      <p class="p-1"><strong>Science:</strong> ${student.grades.Science}</p>
      <p class="p-1"><strong>Total:</strong> ${parseInt(student.grades.math) + parseInt(student.grades.English) + parseInt(student.grades.Science)}</p>
      <p class="p-1"><strong>Average:</strong> ${((parseInt(student.grades.math) + parseInt(student.grades.English) + parseInt(student.grades.Science)) / 3).toFixed(2)}</p>
      <p class="p-1"><strong>Status:</strong> ${((parseInt(student.grades.math) + parseInt(student.grades.English) + parseInt(student.grades.Science)) / 3) >= 50 ? 'Pass' : 'Fail'}</p>
      <button class="mt-4 downloadReport bg-blue-600 text-white px-4 py-2 rounded">Download Report PDF</button>
    `;

    const modal = document.createElement('div');
    modal.className = "fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-50";
    modal.appendChild(infoContainer);
    document.body.appendChild(modal);

    // Enhanced PDF Generator
    infoContainer.querySelector('.downloadReport').addEventListener('click', () => {
      const currentDate = new Date().toLocaleString();
      const total =
        parseInt(student.grades.math) +
        parseInt(student.grades.English) +
        parseInt(student.grades.Science);
      const average = (total / 3).toFixed(2);
      const status = average >= 50 ? "Pass" : "Fail";

      const report = document.createElement("div");
      report.className = "p-4";
      report.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="font-size: 24px; font-weight: bold;">IlAYS SCHOOL </h1>
          <h2 style="font-size: 18px;">Student Grade Report</h2>
          <p>Published by: Teacher Amin Bashir</p>
         
          <hr style="margin: 10px 0;">
        </div>

        <div style="margin-bottom: 20px;">
          <p><strong>Name:</strong> ${student.name}</p>
          <p><strong>ID:</strong> ${student.id}</p>
          <p><strong>Class:</strong> ${student.class}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f2f2f2;">
              <th style="border: 1px solid #000; padding: 8px;">Subject</th>
              <th style="border: 1px solid #000; padding: 8px;">Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #000; padding: 8px;">Math</td>
              <td style="border: 1px solid #000; padding: 8px;">${student.grades.math}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 8px;">English</td>
              <td style="border: 1px solid #000; padding: 8px;">${student.grades.English}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 8px;">Science</td>
              <td style="border: 1px solid #000; padding: 8px;">${student.grades.Science}</td>
            </tr>
          </tbody>
        </table>

        <div style="margin-bottom: 30px;">
          <p><strong>Total:</strong> ${total}</p>
          <p><strong>Average:</strong> ${average}</p>
           <p class=" font-bold ${average >= 50 ? 'text-green-600' : 'text-red-600'}">Status:  ${status}</p>
        </div>

        <div style="margin-top: 50px;">
          <p><strong>Teacher Signature:</strong></p>
           <p style=" margin-top:100px">Date: ${currentDate}</p>

        </div>
      `;

      html2pdf()
        .from(report)
        .set({
          margin: 10,
          filename: `${student.name}_Grade_Report.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .save();
    });

    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        document.body.removeChild(modal);
      }
    });
  }
});



const userStudent = document.querySelector('.userStudent');
const UserRegister = document.querySelector('.UserRegister');
const userbtn = document.querySelector('.userbtn');
const user = document.querySelector('.user'); 
const CloseBtn = document.getElementById('close-modal');

// Show the "Register" section
userStudent.addEventListener('click', () => {
  UserRegister.classList.remove('hidden');
  registersection.classList.add('hidden');
  heroes.forEach(btn => btn.classList.add('hidden'));
  document.querySelector('.view').classList.add('hidden');
});


userbtn.addEventListener('click', () => {
  user.classList.remove('hidden');
});

// Close the modal
CloseBtn.addEventListener('click', () => {
  user.classList.add('hidden');
});


window.addEventListener('click', (e) => {
  if (e.target === user) {
    user.classList.add('hidden');
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const newStudentAdmin = document.querySelector('.newStudentAdmin');
  const studentAdmins = document.querySelector('.AdminLists');
  const InputName = document.querySelector('#UserNames');
  const rolename= document.querySelector('#rolename')

  if (!newStudentAdmin || !studentAdmins || !InputName) {
    console.warn('Required elements not found in the DOM.');
    return;
  }

  newStudentAdmin.addEventListener('submit', (event) => {
    event.preventDefault();

    const inputValue = InputName.value.trim();
    const Rolevalue = rolename.value.trim();
    if (!inputValue) return alert('Please enter the name');

    const newStudent = {
      id: Date.now(),
      name: inputValue,
      role: Rolevalue 


    };

    displayStudentRow(newStudent);
    saveLocal(newStudent);
    user.classList.add('hidden')
    InputName.value = "";
  });

  const displayStudentRow = (student) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td class="px-4 py-2 text-lg border">${student.id}</td>
      <td class="px-4 py-2 text-lg border">${student.name}</td>
      <td class="px-4 py-2 text-lg border">${student.role}</td>
      <td class="px-4 py-2 text-lg border" colspan="2">
        <button class="Deletebtn bg-red-500 text-white px-3 py-1 rounded">DELETE</button>
       
      </td>
    `;
    studentAdmins.appendChild(newRow);

    const DeleteBtn = newRow.querySelector('.Deletebtn');
    DeleteBtn.addEventListener('click', () => {
      deleteHandle(student.id);
      newRow.remove();
    });
 
  };


  const deleteHandle = (id) => {
    let students = JSON.parse(localStorage.getItem('users')) || [];
    students = students.filter(student => student.id !== id);
    localStorage.setItem('users', JSON.stringify(students));
  };

  const saveLocal = (student) => {
    const existing = JSON.parse(localStorage.getItem("users")) || [];
    existing.push(student);
    localStorage.setItem('users', JSON.stringify(existing));
  };

  const savedStudents = JSON.parse(localStorage.getItem("users")) || [];
  savedStudents.forEach(displayStudentRow);
});
