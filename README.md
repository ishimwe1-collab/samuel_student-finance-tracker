# Student Finance Tracker

## Overview

Student Finance Tracker is a responsive web application designed to help students manage their finances efficiently. The application allows users to create budgets, record transactions, search financial records, and maintain organized spending information. The project was built using semantic HTML, responsive CSS, and vanilla JavaScript while focusing on accessibility, usability, and data persistence.

### Technologies Used

* HTML5
* CSS3
* Vanilla JavaScript
* Local Storage API

---

## Features

### Budget Management

* Create and manage budgets
* Track spending against budget limits
* Monitor financial progress

### Transaction Management

* Add transactions
* Edit transactions
* Delete transactions
* Sort transaction records

### Search Functionality

* Search by transaction description
* Search by category
* Regex-powered filtering and matching

### Data Persistence

* Save data using localStorage
* Export financial records as JSON
* Import previously saved JSON files

### Accessibility Features

* Keyboard navigation support
* Skip navigation links
* ARIA live regions
* Semantic HTML landmarks
* Screen-reader-friendly labels

---

## Setup Guide

1. Download or clone the repository.
2. Open the project folder.
3. Open `index.html` in any modern web browser.
4. No additional installation or dependencies are required.

---

## Project Structure

```text
project/
│
├── index.html
├── styles/
│   └── style.css
├── scripts/
│   ├── app.js
│   ├── ui.js
│   ├── storage.js
│   ├── search.js
│   ├── validators.js
│   └── state.js
├── assets/
├── tests/
└── README.md
```

---

## Regex Validation Rules

### Transaction Description

Pattern:

```regex
^[A-Za-z0-9 ]{3,50}$
```

Purpose:
Allows letters, numbers, and spaces while enforcing a minimum and maximum length.

### Amount Validation

Pattern:

```regex
^\d+(\.\d{1,2})?$
```

Purpose:
Ensures valid currency values with up to two decimal places.

### Category Validation

Pattern:

```regex
^[A-Za-z ]+$
```

Purpose:
Allows only alphabetic characters and spaces.

### Advanced Validation Example

Pattern:

```regex
^(?!.*(.)\1{2})
```

Purpose:
Prevents excessive repeated characters and demonstrates advanced regex usage.

---

## Keyboard Navigation Map

| Key         | Function                                  |
| ----------- | ----------------------------------------- |
| Tab         | Move to next interactive element          |
| Shift + Tab | Move to previous interactive element      |
| Enter       | Submit forms and activate controls        |
| Space       | Activate buttons and controls             |
| Escape      | Close dialogs or overlays (if applicable) |

---

## Accessibility Notes

The application follows accessibility best practices through:

* Semantic HTML structure
* Header, navigation, main, and footer landmarks
* Skip navigation link
* ARIA live region announcements
* Properly associated form labels
* Visible keyboard focus indicators
* Keyboard-only navigation support
* Responsive layouts for different devices

---

## Testing Instructions

### Validation Testing

✓ Empty fields are rejected

✓ Invalid amounts are rejected

✓ Invalid categories are rejected

✓ Regex validation functions correctly

### Data Persistence Testing

✓ Data remains after page refresh

✓ Import functionality restores saved data

✓ Export functionality generates valid JSON files

### User Interface Testing

✓ Transaction creation works correctly

✓ Editing and deleting transactions work correctly

✓ Search functionality filters results correctly

### Responsive Design Testing

✓ Mobile layout tested

✓ Tablet layout tested

✓ Desktop layout tested

---

## Screenshots

### Desktop View

Insert screenshot here.

### Tablet View

Insert screenshot here.

### Mobile View

Insert screenshot here.

---

## Live Demo

GitHub Pages URL:

https://ishimwe1-collab.github.io/samuel_student-finance-tracker/


## Live Video Demo

link to video: https://youtu.be/3DbHTWmNBGQ

## Conclusion

The Student Finance Tracker demonstrates responsive web design, semantic HTML, accessibility practices, JavaScript-driven interactivity, local data persistence, regex validation, and user-friendly financial management tools. The project was developed to provide students with a practical way to organize and monitor their finances while showcasing modern front-end development techniques.
