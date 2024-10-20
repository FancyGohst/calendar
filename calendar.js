function $(ele) {
  return document.querySelector(ele);
}

let _Date = new Date();
let dateYear = _Date.getFullYear();
let dateMonth = _Date.getMonth() + 1;
let dateDay = _Date.getDate();
let dateWeek = _Date.getDay();
let _year = $('.year');
let _month = $('.month');

function setDate() {
  _year.innerHTML = dateYear;
  _month.innerHTML = dateMonth;
}

let weekArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
let weekList = document.querySelector('.week-list');

function setWeekList() {
  weekList.innerHTML = '';
  for (let i = 0; i < weekArr.length; i++) {
    weekList.innerHTML += `<li>${weekArr[i]}</li>`;
  }
}

function startWeek() {
  let startWeek = new Date(dateYear, dateMonth - 1, 1).getDay(); // Month is 0-indexed
  return startWeek;
}

function allDate(year, month) {
  let date = new Date(year, month, 0);
  return date.getDate();
}

function setDateList() {
  let _date = allDate(dateYear, dateMonth);
  let _week = startWeek();
  let prevDateLen = allDate(dateYear, dateMonth - 1);
  let dateList = $('.day-list');
  dateList.innerHTML = '';

  // Previous month days
  for (let index = _week; index > 0; index--) {
    dateList.innerHTML += `<li class="pas">${prevDateLen - index + 1}</li>`;
  }

  // Current month days
  for (let index = 1; index <= _date; index++) {
    let li = `<li>${index}</li>`;
    if (_year.innerHTML == dateYear && _month.innerHTML == dateMonth && index == dateDay) {
      li = `<li class="active">${index}</li>`;
    }
    dateList.innerHTML += li;
  }

  // Next month days
  let totalDays = 42; // Display 6 weeks
  let allLi = document.querySelectorAll('.day-list li');
  for (let index = 1; allLi.length + index <= totalDays; index++) {
    dateList.innerHTML += `<li class="pas">${index}</li>`;
  }
}

setDate();
setWeekList();
setDateList();

function changeYear() {
  setDateList();
}

function prevYear() {
  dateYear--;
  changeYear();
}

function nextYear() {
  dateYear++;
  changeYear();
}

function changeMonth() {
  setDateList();
}

function prevMonth() {
  dateMonth--;
  if (dateMonth < 1) {
    dateMonth = 12;
    prevYear();
  }
  changeMonth();
}

function nextMonth() {
  dateMonth++;
  if (dateMonth > 12) {
    dateMonth = 1;
    nextYear();
  }
}

let prevBtn = $('.prev-month');
let nextBtn = $('.next-month');

prevBtn.onclick = function () {
  prevMonth();
};

nextBtn.onclick = function () {
  nextMonth();
};
