const addnews = document.querySelector('.addnew');
const modal = document.querySelector('.modal');
const studeList = document.querySelector('.studeList');
const studentBody = document.querySelector('.student-body');
const newstudnt = document.querySelector('.newstudnts');
const ToastBox = document.querySelector('.ToastBox');

let isUpdating = false;
let updatingStudentId = null;

let succesMssg = '<i class="fa-solid fa-circle-check"></i> Registered Successfully';
let ErrorMsg = '<i class="fa-solid fa-circle-check"></i> Deleted Successfully';
let invalidMssg = '<i class="fa-solid fa-circle-exclamation"></i> Invalid Input, check again';
let updateMssg = '<i class="fa-solid fa-circle-check"></i> Updated Successfully';
let existMsg =  '<i class="fa-solid fa-circle-exclamation"></i> Student ID already exists'

// Show modal
addnews.addEventListener('click', () => {
  modal.style.display = 'block';
  isUpdating = false;
  updatingStudentId = null;
  newstudnt.reset();
});

// Close modal
document.querySelector('#close-modal').addEventListener('click', closeModal);
window.onclick = function (event) {
  if (event.target === modal) {
    closeModal();
  }
};

function closeModal() {
  modal.style.display = 'none';
}

// Load existing students
window.addEventListener('DOMContentLoaded', reloadTable);

// Submit form
newstudnt.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.querySelector('#name').value.trim();
  const id = document.querySelector('#id').value.trim();
  const className = document.querySelector('#class').value.trim();
  const math = document.querySelector('#math').value.trim();
  const English = document.querySelector('#English').value.trim();
  const Science = document.querySelector('#science').value.trim();

  if (!name || !id || !className || !math || !English || !Science) {
    showMessage(invalidMssg);
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
      localStorage.setItem('students', JSON.stringify(students));
      showMessage(updateMssg);
    }
  } else {
    const exists = students.some(s => s.id === id);
    if (exists) {
      showMessage(existMsg);
      return;
    }
    students.push({
      name,
      id,
      class: className,
      grades: { math, English, Science }
    });
    localStorage.setItem('students', JSON.stringify(students));
    showMessage(succesMssg);
  }

  event.target.reset();
  closeModal();
  reloadTable();
  isUpdating = false;
  updatingStudentId = null;
});

// Display table
function reloadTable() {
  const students = JSON.parse(localStorage.getItem('students')) || [];
  studentBody.innerHTML = '';
  students.forEach((student, index) => displayStudentRow(student, index));
}

function displayStudentRow(student, index) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${index + 1}</td>
    <td>${student.name}</td>
    <td>${student.id}</td>
    <td>${student.class}</td>
    <td>${student.grades.math}</td>
    <td>${student.grades.English}</td>
    <td>${student.grades.Science}</td>
    <td><button class="delete">Delete</button></td>
    <td><button class="update">Update</button></td>
  `;
  studentBody.appendChild(row);

  row.querySelector('.delete').addEventListener('click', () => {
    deleteStudent(student.id);
  });

  row.querySelector('.update').addEventListener('click', () => {
    prepareUpdate(student);
  });
}

// Set form for update
function prepareUpdate(student) {
  document.querySelector('#name').value = student.name;
  document.querySelector('#id').value = student.id;
  document.querySelector('#class').value = student.class;
  document.querySelector('#math').value = student.grades.math;
  document.querySelector('#English').value = student.grades.English;
  document.querySelector('#science').value = student.grades.Science;

  isUpdating = true;
  updatingStudentId = student.id;
  modal.style.display = 'block';
}

// Delete student
function deleteStudent(id) {
  let students = JSON.parse(localStorage.getItem('students')) || [];
  students = students.filter(student => student.id !== id);
  localStorage.setItem('students', JSON.stringify(students));
  reloadTable();
  showMessage(ErrorMsg);
}

// Toast notification
  function showMessage(msg) {
  const newEl = document.createElement('div');
  newEl.classList.add('toast');
  newEl.innerHTML = msg;

  if (msg.includes('Deleted')) {
    newEl.classList.add('error');
  } else if (msg.includes('Invalid')) {
    newEl.classList.add('invalid');
  } else if (msg.toLowerCase().includes('update')) {
    newEl.classList.add('updated');
  }else if (msg.toLowerCase().includes('exist')) {
    newEl.classList.add('error');
  } 


  ToastBox.appendChild(newEl);
  setTimeout(() => {
    newEl.remove();
  }, 3000);
}
