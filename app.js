// Enrolment number: A85204925012 | Started: 2026-11-13
const MAX_NAME = 25;
const MIN_PASSWORD = 8;

// Get the registration form
const form = document.getElementById("registerForm");

if (form) {
  const name = document.getElementById("fullName");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const city = document.getElementById("city");

  const nameCounter = document.getElementById("nameCounter");
  const cityChoice = document.getElementById("cityChoice");
  const errorsList = document.getElementById("errors");

  // Count name characters
  name.addEventListener("keyup", function () {
    let left = MAX_NAME - name.value.length;
    nameCounter.textContent = left + " characters left out of 25";
  });

  // Show selected city
  city.addEventListener("change", function () {
    if (city.value === "") {
      cityChoice.textContent = "";
    } else {
      cityChoice.textContent = "You chose " + city.value;
    }
  });

  // Check email
  function checkEmail(value) {
    let at = value.indexOf("@");
    let dot = value.lastIndexOf(".");

    if (value.includes(" ")) {
      return false;
    }

    if (at > 0 && dot > at + 1 && dot < value.length - 1) {
      return true;
    }

    return false;
  }

  // Check phone number
  function checkPhone(value) {
    if (value.length !== 9) {
      return false;
    }

    for (let i = 0; i < value.length; i++) {
      if (value[i] < "0" || value[i] > "9") {
        return false;
      }
    }

    return true;
  }

  // Check all form inputs
  function validate() {
    let errors = [];

    if (name.value.trim() === "") {
      errors.push("Full name is required.");
    }

    if (email.value.trim() === "") {
      errors.push("Email is required.");
    } else if (!checkEmail(email.value.trim())) {
      errors.push("Email is not valid.");
    }

    if (phone.value.trim() === "") {
      errors.push("Phone is required.");
    } else if (!checkPhone(phone.value.trim())) {
      errors.push("Phone must be exactly 9 digits.");
    }

    if (password.value === "") {
      errors.push("Password is required.");
    } else if (password.value.length < MIN_PASSWORD) {
      errors.push("Password must be at least 8 characters.");
    }

    if (confirmPassword.value === "") {
      errors.push("Please confirm your password.");
    } else if (password.value !== confirmPassword.value) {
      errors.push("Passwords do not match.");
    }

    if (city.value === "") {
      errors.push("Please choose a city.");
    }

    return errors;
  }

  // Display error messages
  function showErrors(errors) {
    errorsList.textContent = "";

    for (let i = 0; i < errors.length; i++) {
      let item = document.createElement("li");
      item.textContent = errors[i];
      errorsList.appendChild(item);
    }
  }

  // Check individual field
  function checkField(field) {
    let value = field.value.trim();

    if (value === "") {
      return false;
    }

    if (field.id === "email") {
      return checkEmail(value);
    }

    if (field.id === "phone") {
      return checkPhone(value);
    }

    if (field.id === "password") {
      return field.value.length >= MIN_PASSWORD;
    }

    if (field.id === "confirmPassword") {
      return field.value === password.value;
    }

    return true;
  }

  // Add red border for wrong inputs
  let fields = [name, email, phone, password, confirmPassword, city];

  for (let i = 0; i < fields.length; i++) {
    fields[i].addEventListener("blur", function () {
      if (checkField(fields[i])) {
        fields[i].classList.remove("invalid");
      } else {
        fields[i].classList.add("invalid");
      }
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let errors = validate();
    showErrors(errors);

    if (errors.length > 0) {
      return;
    }

    let userName = name.value.trim();

    if (confirm("Register " + userName + "?")) {
      location.href = "board.html?name=" + encodeURIComponent(userName);
    }
  });
}

// Get the marks board page
const table = document.getElementById("marksTable");

if (table) {
  const welcome = document.getElementById("welcome");
  const loadTime = document.getElementById("loadTime");

  // Show welcome and load time when the page loads
  window.addEventListener("load", function () {
    let userName = new URLSearchParams(location.search).get("name");

    if (userName === null || userName === "") {
      userName = "guest";
    }

    welcome.textContent = "Welcome, " + userName;
    loadTime.textContent = "Page loaded at " + new Date().toLocaleTimeString();

    loadStudents();
  });

  const PASS_MARK = 42;
  const tableBody = document.getElementById("marksBody");
  const message = document.getElementById("message");
  const sortSelect = document.getElementById("sortSelect");
  const backBtn = document.getElementById("backBtn");

  let students = [];

  // Fail / Pass / Distinction
  function grade(marks) {
    if (marks < PASS_MARK) {
      return "Fail";
    }
    if (marks < 75) {
      return "Pass";
    }
    return "Distinction";
  }

  // Build one row per student with createElement
  function showTable(list) {
    tableBody.textContent = "";

    for (let i = 0; i < list.length; i++) {
      let row = document.createElement("tr");

      let nameCell = document.createElement("td");
      nameCell.textContent = list[i].name;

      let cityCell = document.createElement("td");
      cityCell.textContent = list[i].city;

      let marksCell = document.createElement("td");
      marksCell.textContent = list[i].marks;

      let gradeCell = document.createElement("td");
      gradeCell.textContent = grade(list[i].marks);

      row.appendChild(nameCell);
      row.appendChild(cityCell);
      row.appendChild(marksCell);
      row.appendChild(gradeCell);
      tableBody.appendChild(row);
    }
  }

  // Sort a copy of the array, then show it
  function sortAndShow() {
    let sorted = [...students];

    if (sortSelect.value === "marks") {
      sorted.sort((a, b) => b.marks - a.marks);
    } else {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }

    showTable(sorted);
  }

  // Load students.json
  async function loadStudents() {
    try {
      let res = await fetch("students.json");

      if (!res.ok) {
        throw new Error("Server answered " + res.status);
      }

      students = await res.json();
      sortAndShow();
    } catch (error) {
      message.textContent = "Could not load the students list: " + error.message;
    }
  }

  sortSelect.addEventListener("change", sortAndShow);

  backBtn.addEventListener("click", function () {
    history.back();
  });
}

console.log("A85204925012");
