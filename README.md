

# Student Grade Management System

A comprehensive and interactive web application designed to facilitate efficient management of student academic records, including registration, grade entry, attendance tracking, and report generation. The system empowers teachers to maintain up-to-date student information while providing students with easy access to their grades via a seamless search interface.

---

## Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Technologies](#technologies)
* [Installation](#installation)
* [Usage](#usage)
* [Project Structure](#project-structure)
* [Functionality Details](#functionality-details)
* [Future Enhancements](#future-enhancements)
* [Author](#author)
* [License](#license)

---

## Overview

The Student Grade Management System is a user-friendly platform tailored for educational environments to simplify the processes of recording, updating, and reviewing student grades and attendance. Teachers can manage student records effectively, while students can search and view their grades in real time.

This solution uses modern frontend technologies with client-side data persistence, providing a responsive and intuitive interface suitable for small to medium-scale academic setups.

---

## Features

* **Student Registration and Record Management**
  Register new students with unique identifiers, class assignments, and subject-wise grades. Update or delete student information as needed.

* **Dynamic Grade Calculation and Status Display**
  Automatic computation of total and average scores per student with pass/fail status based on defined thresholds.

* **Real-time Search for Students**
  Students can search for their records by name in the grade view, facilitating quick access to their academic performance.

* **Interactive Data Visualization**
  Use of charts to present statistical summaries such as total students, subjects, and pass/fail ratios.

* **Responsive Carousel UI**
  Implements Swiper.js for a smooth, mobile-friendly carousel displaying key dashboard information.

* **PDF Report Generation**
  Generate professional PDF grade reports including detailed student data, grades, totals, averages, and performance status.

* **Smooth Navigation and UI Control**
  Toggle between different views such as home dashboard, registration form, and grade overview with intuitive UI transitions.

---

## Technologies

* **Frontend:** HTML5, CSS3 (Tailwind CSS), Vanilla JavaScript
* **Libraries:**

  * [Swiper.js](https://swiperjs.com/) for responsive carousel
  * [Chart.js](https://www.chartjs.org/) for data visualization
  * [jsPDF](https://github.com/parallax/jsPDF) for PDF report generation
* **Data Storage:** Browser LocalStorage for persistent client-side data management

---

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/student-grade-management.git
   ```

2. Open `index.html` in a modern web browser.
3. Click to check your Grade by Entering Amin as default as Admin

*No backend setup is required as the application uses LocalStorage.*

---

## Usage

1. **Register Students:**
   Navigate to the "Grades" section and fill the form to add student details and their grades.

2. **Manage Records:**
   Update or delete existing student records directly from the students list.

3. **View Grades:**
   Access the "View Grade" section to see a list of all students with their calculated totals and statuses.

4. **Search Student:**
   Use the search bar on the grade view page to filter students by name for quick grade retrieval.

5. **Download PDF Report:**
   Click on a student row to open a modal with detailed information and the option to download a PDF report of the student's performance.

6. **Dashboard:**
   The home page contains visual summaries of student statistics and a carousel for additional insights.

---

## Project Structure

```
/student-grade-management
│
├── index.html          # Main entry point with UI layout
├── styles.css          # Styling with Tailwind CSS and custom CSS
├── app.js              # Core JavaScript logic and event handling
├── assets/             # Images, icons, and static files
├── libs/               # External libraries: Swiper, Chart.js, jsPDF
└── README.md           # Project documentation
```

---

## Functionality Details

* **Student Data Model:**
  Each student entry consists of:

  * `name` (string)
  * `id` (string)
  * `class` (string)
  * `grades` (object): Contains `math`, `English`, and `Science` scores

* **Data Persistence:**
  Student data is saved in browser LocalStorage, enabling persistent data across sessions without server dependency.

* **Grade Computations:**
  Total and average grades are calculated dynamically; students are marked "Pass" if the average is 50 or above, otherwise "Fail".

* **Search Functionality:**
  The search input filters displayed students by matching substrings in their names in real-time.

* **PDF Report Generation:**
  Detailed, formatted PDF reports can be generated per student including school header, student details, grades, and a timestamp.

* **User Interface:**

  * Responsive and mobile-friendly
  * Smooth toggling between sections
  * Input validation and user feedback

---

## Future Enhancements

* Backend integration with a database for centralized data storage and multi-user support
* User authentication with roles (Admin, Teacher, Student)
* Expandable grade entry for more subjects
* Enhanced UI/UX with animations and accessibility improvements
* Exporting reports in additional formats (CSV, Excel)

---


---

