const addnews = document.querySelector('.addnew');
const modal = document.querySelector('.modal');
const studeList = document.querySelector('.studeList');
const studentBody = document.querySelector('.student-body');
const newstudnt = document.querySelector('.newstudnts');

// Show modal when 'Add New' is clicked
addnews.addEventListener('click', () => {
  modal.style.display = 'block';
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

// Load existing students on page load
window.addEventListener('DOMContentLoaded', reloadTable);

// Form submission handler
newstudnt.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.querySelector('#name').value;
  const id = document.querySelector('#id').value;
  const className = document.querySelector('#class').value;
  const math = document.querySelector('#math').value;
  const English = document.querySelector('#English').value;
  const Science = document.querySelector('#science').value;

  const student = {
    name: name,
    id: id,
    class: className,
    grades: {
      math: math,
      English: English,
      Science: Science
    }
  };
  if (name === "" || id === "" || className === "" || math === "" || English === "" || Science === "") {
    showMessage(invalidMssg);
    return;
  }

  saveStudent(student);
 showMessage(succesMssg)
  event.target.reset();
  closeModal();
  reloadTable();
});

// Save student to local storage
function saveStudent(student) {
  const students = JSON.parse(localStorage.getItem('students')) || [];
    if (!stored.includes(student)) {
        students.push(student);}
  ;
  localStorage.setItem('students', JSON.stringify(students));
}

// Load students and display in table
function reloadTable() {
  const students = JSON.parse(localStorage.getItem('students')) || [];
  studentBody.innerHTML = ''; 

  students.forEach((student, index) => {
    displayStudentRow(student, index);
  });
}

// Display single student row
function displayStudentRow(student, index) {
  const row = document.createElement('tr');

  row.innerHTML = `
    <td>${index + 1}</td>
    <td >${student.name}</td>
    <td>${student.id}</td>
    <td>${student.class}</td>
    <td>${student.grades.math}</td>
    <td>${student.grades.English}</td>
    <td>${student.grades.Science}</td>
    <td><button class="delete">Delete</button></td>
    <td><button class="update">Update</button></td>
  `;
 studentBody.appendChild(row);
  
  const deleteBtn = row.querySelector('.delete');
  deleteBtn.addEventListener('click', () => {
    deleteStudent(student.id);
  });
const updatebtn = row.querySelector('.update')
updatebtn.addEventListener('click',()=>{
    updatestudent(student.id)
})
}

function updatestudent(id){
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const student = students.find(student => student.id === id);
    if (student) {
        document.querySelector('#name').value = student.name;
        document.querySelector('#id').value = student.id;
        document.querySelector('#class').value = student.class;
        document.querySelector('#math').value = student.grades.math;
        document.querySelector('#English').value = student.grades.English;
        document.querySelector('#science').value = student.grades.Science;
        modal.style.display = 'block';
       
    }
    
}

function deleteStudent(id) {
  let students = JSON.parse(localStorage.getItem('students')) || [];
  students = students.filter(student => student.id !== id);
  localStorage.setItem('students', JSON.stringify(students));
  reloadTable();
  showMessage(ErrorMsg);
}

const ToastBox = document.querySelector('.ToastBox');

 let succesMssg = '<i class="fa-solid fa-circle-check"></i> Registered Successfully';
 let ErrorMsg = '<i class="fa-solid fa-circle-check"></i> Deleted Successfully';
let invalidMssg = '<i class="fa-solid fa-circle-exclamation"></i> Invalid Input, check again';
let updateMssg = '<i class="fa-solid fa-circle-check"></i> Updated Successfully';


function showMessage(msg){
    const newEl = document.createElement('div')
    newEl.classList.add('toast')
    newEl.innerHTML=msg
    if(msg.includes('Deleted')){
        newEl.classList.add('error')
    }else if(msg.includes('Invalid')){
        newEl.classList.add('invalid')
    }if(msg.includes('updated')){
        newEl.classList.add('updated')
    }

    ToastBox.appendChild(newEl)
    setTimeout(() => {
        newEl.remove()
    }, 3000);
}