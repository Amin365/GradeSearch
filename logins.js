const teacherbtn = document.querySelector('.teacherbtn');
const username = document.querySelector('.username');
const closeModal = document.querySelector('.close-modal');
const modal = document.querySelector('.modal');
const Btns = document.querySelector('#Btns');

Btns.addEventListener('click', () => {
  modal.classList.remove('hidden');
 
});


closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
});

window.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.add('hidden');
});

window.addEventListener('load', () => {
  if (studentbtn) studentbtn.classList.add('inline-block');
  if (teacherbtn) teacherbtn.classList.add('inline-block');
  if (username) username.classList.add('hidden');
  if (modal) modal.classList.add('hidden');
});

const loginForm = document.querySelector('#loginForm');
const inputValue = document.querySelector('.inputValue');
const users = JSON.parse(localStorage.getItem('users')) || [];

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('hello')
  const inputValues = inputValue.value.trim().toLowerCase();
  const user = users.find(u => u.name.toLowerCase() === inputValues);
  if (!user) {
    alert('User not found!');
    return;
  }
  if (user.role === 'student') {
    window.location.href = 'student.html';  // Assuming students go to student.html
  } else if (user.role === 'teacher') {
    window.location.href = 'Teacher.html';
  } else {
    alert('Unknown role for this user.');
  }
});
