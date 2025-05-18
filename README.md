

## 📚 Student Grade Management System

A web-based system that allows:

* Students to **search for their grades**
* Teachers to **register students and input grades**
* Secure login with role-based redirection (Student or Teacher)

---

### 🚀 Features

#### 1. **Role-Based Login Modal**

* Users choose between **Student** and **Teacher**
* Input validation based on selected role
* Redirects:

  * **Students** → `GradeSearch.html`
  * **Teachers** → `register.html`

#### 2. **Student Grade Search (GradeSearch.html)**

* Students can search for their grades by entering their **ID**
* GPA is calculated dynamically based on subject scores
* Detailed result includes:

  * Student Name
  * Class
  * Grades (Math, English, Science)
  * GPA
* Option to **Download Grades as PDF**

#### 3. **Teacher Grade Registration (register.html)**

* Teachers can:

  * Add new students and their grades
  * Update existing student records
  * Delete student records
* Data is stored using **localStorage**
* Inline **toast notifications** for success, error, update, and validation messages
* Dynamic student table updates in real-time

---

### 🧠 Technologies Used

* HTML5, CSS3, JavaScript (Vanilla)
* `localStorage` for data persistence
* [jsPDF](https://github.com/parallax/jsPDF) for PDF download

---

### 🗂 Folder Structure

```
project-root/
│
├── index.html               // Main entry with role-based modal
├── GradeSearch.html         // Student view to search grades
├── register.html            // Teacher dashboard to manage grades
├── js/
│   ├── login.js             // Handles login modal and redirection
│   ├── GradeSearch.js       // GPA calculation and PDF generation
│   └── register.js          // Add, update, delete student grades
├── css/
│   └── style.css            // UI styles and toast notification styles
└── README.md
```

---

### ✅ How to Use

1. **Open `index.html`** in your browser.
2. Click on "Grade Access" to open the modal.
3. Select your role:

   * If **Student** → type `student` and click Login
   * If **Teacher** → type `teacher` and click Login
4. Redirected accordingly:

   * **Students** search by ID to view their grades and GPA
   * **Teachers** can manage student data

---

### 🔐 Role Authentication Logic

```js
if (inputValue === currentRole) {
  if (currentRole === "student") {
    window.location.href = 'GradeSearch.html';
  } else if (currentRole === "teacher") {
    window.location.href = 'register.html';
  }
} else {
  alert('Invalid username for selected role');
}
```

---

### 📝 Notes

* All student data is stored locally in the browser using `localStorage`
* Data will be cleared if browser storage is cleared
* The system is designed for educational or demonstration purposes




