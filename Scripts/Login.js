const modal = document.querySelector('.modal');
const userName = document.querySelector('.username');
const studentbtn = document.querySelector('.studentbtn');
const teacherbtn = document.querySelector('.teacherbtn');
const loginForm = document.querySelector('#loginForm');
const inputField = document.querySelector('.inputValue');
let currentRole = "";
// Click on the "clickgrde" to open modal
document.querySelector('.clickgrde').addEventListener('click', () => {
  modal.style.display = 'block';
  userName.style.display = 'none';
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
    userName.style.display = 'none'; 
  studentbtn.style.display = 'inline-block';
  teacherbtn.style.display = 'inline-block';
  inputField.value = ''; // clear input
  currentRole = '';
}

// When "Student" is clicked
studentbtn.addEventListener('click', () => {
  teacherbtn.style.display = 'none';
  userName.style.display = 'block';
  currentRole = "student";
});


teacherbtn.addEventListener('click', () => {
  studentbtn.style.display = 'none';
  userName.style.display = 'block';
  currentRole = "teacher";
});


loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputValue = inputField.value.trim().toLowerCase();

  if (inputValue === currentRole) {
    if (currentRole === "student") {
      window.location.href = 'GradeSearch.html';
    } else if (currentRole === "teacher") {
      window.location.href = 'register.html';
    }
  } else {
    alert('Invalid username for selected role');
 
  }
   
});



window.addEventListener('load', () => {

  studentbtn.style.display = 'inline-block';
  teacherbtn.style.display = 'inline-block';
  userName.style.display = 'none';
  inputField.value = '';
  modal.style.display = 'none';
  currentRole = '';
});



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
 

document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
});



  




