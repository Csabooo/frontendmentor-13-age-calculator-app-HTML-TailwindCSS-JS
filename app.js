const button = document.getElementById("button");
const years = document.getElementById("resultYear");
const months = document.getElementById("resultMonth");
const days = document.getElementById("resultDay");

const inputs = document.querySelectorAll("input");

inputs.forEach((x) => {
  x.addEventListener("focus", (e) => {
    e.target.value = "";
  });
});

function calculateAge() {
  const birthYear = parseInt(document.querySelector("#year").value);
  const birthMonth = parseInt(document.querySelector("#month").value);
  const birthDay = parseInt(document.querySelector("#day").value);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  let ageInYears = currentYear - birthYear;
  let ageInMonths = currentMonth - birthMonth;
  let ageInDays = currentDay - birthDay;

  // Ha az aktuális hónap és nap kevesebb, mint a születésnapé, akkor korrigáljuk a számolást
  if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
    ageInYears--;
    if (currentMonth < birthMonth) {
      ageInMonths = 12 - birthMonth + currentMonth;
      if (currentDay < birthDay) {
        ageInMonths--;
        ageInDays = daysInMonth(birthYear, birthMonth - 1) - birthDay + currentDay;
      } else {
        ageInDays = currentDay - birthDay;
      }
    } else {
      if (currentDay < birthDay) {
        ageInMonths = 11;
        ageInDays = daysInMonth(birthYear, birthMonth - 1) - birthDay + currentDay;
      } else {
        ageInMonths = 0;
        ageInDays = currentDay - birthDay;
      }
    }
  } else {
    if (currentDay < birthDay) {
      ageInMonths--;
      ageInDays = daysInMonth(birthYear, birthMonth - 1) - birthDay + currentDay;
    } else {
      ageInDays = currentDay - birthDay;
    }
  }

  years.innerText = ageInYears;
  months.innerText = ageInMonths;
  days.innerText = ageInDays;
}

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

button.addEventListener("click", (e) => {
  e.preventDefault();
  calculateAge();
});