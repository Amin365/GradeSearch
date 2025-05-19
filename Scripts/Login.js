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

 var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,        
    spaceBetween: 20,         
    loop: true,               
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
  });


  
