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

const labelDay = document.querySelector("#labelDay");
const labelMonth = document.querySelector("#labelMonth");
const labelYear = document.querySelector("#labelYear");



inputs.forEach((x) => {
  x.addEventListener("focus", (e) => {
    e.target.value = "";
  });
});

function reset() {
  years.innerText = "--";
  months.innerText = "--";
  days.innerText = "--";
  smallDD.classList.remove("red");
  smallMM.classList.remove("red");
  smallYY.classList.remove("red");
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

  reset();

  if (!birthDayValue) {
    smallDD.classList.toggle("red");
    labelDay.classList.toggle("red");
    inputDay.classList.toggle("red");

  }
  if (!birthMonthValue) {
    smallMM.classList.toggle("red");
    labelMonth.classList.toggle("red");
    inputMonth.classList.toggle("red");

  }
  if (!birthYearValue) {
    smallYY.classList.toggle("red");
    labelYear.classList.toggle("red");
    inputYear.classList.toggle("red");

    
  } 
  
  
  if (birthDayValue && birthMonthValue && birthYearValue) {
    // Az összes születési adat rendelkezésre áll, kiszámítjuk a kort
    // ...
  
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    let ageInDays = currentDay - birthDayValue;
    let ageInMonths = currentMonth - birthMonthValue;
    let ageInYears = currentYear - birthYearValue;

    // Ha az aktuális hónap és nap kevesebb, mint a születésnapé, akkor korrigáljuk a számolást
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