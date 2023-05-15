const button = document.getElementById("button");
const years = document.getElementById("resultYear");
const months = document.getElementById("resultMonth");
const days = document.getElementById("resultDay");

const inputs = document.querySelectorAll("input");

const inputDay = document.querySelector("#day");
const inputMonth = document.querySelector("#month");
const inputYear = document.querySelector("#year");

const smallDD = document.querySelector("#smallDay");
const smallMM = document.querySelector("#smallMonth");
const smallYY = document.querySelector("#smallYear");


const validDD = document.querySelector("#validDay");
const validMM = document.querySelector("#validMonth");
const validYY = document.querySelector("#validYear");

const lengtMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const labelDay = document.querySelector("#labelDay");
const labelMonth = document.querySelector("#labelMonth");
const labelYear = document.querySelector("#labelYear");



inputs.forEach((x) => {
  x.addEventListener("focus", (e) => {
    e.target.value = "";
    reset();
  });
});

function reset() {
  years.innerText = "--";
  months.innerText = "--";
  days.innerText = "--";
  smallDD.classList.remove("red");
  smallMM.classList.remove("red");
  smallYY.classList.remove("red");

  validDD.classList.remove("red");
  validMM.classList.remove("red");
  validYY.classList.remove("red");

  labelDay.classList.remove("red");
  labelMonth.classList.remove("red");
  labelYear.classList.remove("red");
  inputDay.classList.remove("red");
  inputMonth.classList.remove("red");
  inputYear.classList.remove("red");
}


function calculateAge() {

  const birthDayValue = parseInt(inputDay.value);
  const birthMonthValue = parseInt(inputMonth.value);
  const birthYearValue = parseInt(inputYear.value);

  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  reset();

  let hasError = false;

  if (!birthDayValue) {
    smallDD.classList.toggle("red");
    labelDay.classList.toggle("red");
    inputDay.classList.toggle("red");
    hasError = true;
  }

  if (!birthMonthValue) {
    smallMM.classList.toggle("red");
    labelMonth.classList.toggle("red");
    inputMonth.classList.toggle("red");
    hasError = true;
  }

  if (!birthYearValue){
    smallYY.classList.toggle("red");
    labelYear.classList.toggle("red");
    inputYear.classList.toggle("red");
    hasError = true;
  }

  if (birthDayValue > 31 || birthDayValue < 1) {
    if (smallDD.classList.contains("red")) {
      smallDD.classList.remove("red");
      labelDay.classList.toggle("red");
      inputDay.classList.toggle("red");
    }
    validDD.classList.toggle("red");
    labelDay.classList.toggle("red");
    inputDay.classList.toggle("red");
    hasError = true;
  }

  if (birthMonthValue > 12 || birthMonthValue < 1) {
    if (smallMM.classList.contains("red")) {
      smallMM.classList.remove("red");
      labelMonth.classList.toggle("red");
      inputMonth.classList.toggle("red");
    }
    validMM.classList.toggle("red");
    labelMonth.classList.toggle("red");
    inputMonth.classList.toggle("red");
    hasError = true;
  }

  if (birthYearValue > currentDate.getFullYear()) {
    validYY.classList.toggle("red");
    labelYear.classList.toggle("red");
    inputYear.classList.toggle("red");
    hasError = true;
  }

  if (hasError) {
    return; // If there is an error, do not calculate the age
  }


  // Leap year check
  if ((birthYearValue % 4 === 0 && birthYearValue % 100 !== 0) || birthYearValue % 400 === 0) {
    lengtMonth[1] = 29; // Length of February is 29 days
  }

  // Check the day
  if (birthDayValue < 1 || birthDayValue > lengtMonth[birthMonthValue - 1]) {
    validDD.classList.toggle("red");
    labelDay.classList.toggle("red");
    inputDay.classList.toggle("red");
    return;
  }

  reset();


  if (birthDayValue && birthMonthValue && birthYearValue) {
    // All birth data are available, age is calculated

    years.innerText = "--";
    months.innerText = "--";
    days.innerText = "--";

    let ageInDays = currentDay - birthDayValue;
    let ageInMonths = currentMonth - birthMonthValue;
    let ageInYears = currentYear - birthYearValue;

    // If the current month and day are less than the birthday, the calculation is corrected

    if (currentMonth < birthMonthValue || (currentMonth === birthMonthValue && currentDay < birthDayValue)) {
      ageInYears--;
      if (currentMonth < birthMonthValue) {
        ageInMonths = 12 - birthMonthValue + currentMonth;
        if (currentDay < birthDayValue) {
          ageInMonths--;
          ageInDays = daysInMonth(birthYearValue, birthMonthValue - 1) - birthDayValue + currentDay;
        } else {
          ageInDays = currentDay - birthDayValue;
        }
      } else {
        if (currentDay < birthDayValue) {
          ageInMonths = 11;
          ageInDays = daysInMonth(birthYearValue, birthMonthValue - 1) - birthDayValue + currentDay;
        } else {
          ageInMonths = 0;
          ageInDays = currentDay - birthDayValue;
        }
      }
    } else {
      if (currentDay < birthDayValue) {
        ageInMonths--;
        ageInDays = daysInMonth(birthYearValue, birthMonthValue - 1) - birthDayValue + currentDay;
      } else {
        ageInDays = currentDay - birthDayValue;
      }
    }

    years.innerText = ageInYears;
    months.innerText = ageInMonths;
    days.innerText = ageInDays;
  }
}

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

button.addEventListener("click", (e) => {
  e.preventDefault();
  calculateAge();
});