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

});


const teacherbtn = document.querySelector('.teacherbtn');
const username = document.querySelector('.username');
const closeModal = document.querySelector('.closeModal');
const userAdmin = document.querySelector('.userAdmin');
const Btns = document.querySelector('#Btns');

Btns.addEventListener('click', () => {
  userAdmin.classList.remove('hidden');
 
});


closeModal.addEventListener('click', () => {
  userAdmin.classList.add('hidden');
});

window.addEventListener('click', (e) => {
  if (e.target === userAdmin) userAdmin.classList.add('hidden');
});

window.addEventListener('load', () => {
  if (studentbtn) studentbtn.classList.add('inline-block');
  if (teacherbtn) teacherbtn.classList.add('inline-block');
  if (username) username.classList.add('hidden');
  if (userAdmin) userAdmin.classList.add('hidden');
});

const loginForm = document.querySelector('#loginForm');
const inputValue = document.querySelector('.inputValue');
const Getusers = JSON.parse(localStorage.getItem('users')) || [];

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('hello')
  const amin = 'amin'; // Assuming 'amin' is the admin username
  if (!inputValue.value.trim()) {
    alert('Please enter a username!');
    return;
  }
  if (inputValue.value.trim().toLowerCase() === amin) {
    window.location.href = 'Teacher.html'; // Redirect to admin page
    return;
  }
  
  const inputValues = inputValue.value.trim().toLowerCase();
  const userNames = Getusers.find(u => u.name.toLowerCase() === inputValues);
  if (!userNames) {
    alert('User not found!');
    return;
  }
  if (userNames.role === 'student') {
    window.location.href = 'student.html';  // Assuming students go to student.html
  } else if (userNames.role === 'teacher') {
    window.location.href = 'Teacher.html';
  } else if(inputValues===amin){
    window.location.href = 'Teacher.html';
  }else {
    alert('Invalid role!');
  }
});







