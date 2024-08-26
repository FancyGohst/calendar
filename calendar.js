function $(ele) {
  return document.querySelector(ele)
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

let weekArr = ['Sun','Mon','Tue','Wed','Thr','Fri','Sat'];
let weekList = document.querySelector('.week-list');
function setWeekList() {
  weekList.innerHTML =''; 
  for (let i = 0; i < weekArr.length; i++) {
    weekList.innerHTML += `<li>${weekArr[i]}</li>`;
  }
}

function startWeek() {
  let_startWeek = new Date(dateYear + '-' + dateMonth).getDay();
  return let_startWeek;
}

function allDate(dateYear, dateMonth) {
  let date = new Date(dateYear, dateMonth, 0);
  let _date = date.getDate()
  return _date;
}

function setDateList() {
  let _date = allDate(dateYear, dateMonth);
  let _week = startWeek();
  let prevDateLen = allDate(dateYear, dateMonth - 1);
  let dateList = $('.day-list');
  dateList.innerHTML = '';

  for (let index = _week - 1; index >= 0; index--) {
    dateList.innerHTML += `<li class = "pas">${prevDateLen - index}</li>`;
  }

  let nowYear =_Date.getFullYear();
  let nowMonth = _Date.getMonth() + 1;

  for (let index = 1; index <= _date; index++) {
    let li = `<li>${index}</li>`;

    if(_year.innerHTML == nowYear && _month.innerHTML == nowMonth && index == dateDay) {

      li = `<li class = "active">${index}</li>`;
    }
    dateList.innerHTML += li;
  }

  let allLi = document.querySelectorAll('.day-listli');

  for(let index = 1; index <= 42 - allLi.length; index++) {
    dateList.innerHTML += `<li class ="pas">${index}</li>`;
  }
};

setDate();
setWeekList();
setDateList(); 

function changeYear() {
  var _year = $('.year');
  _year.innerHTML = dateYear;
  setDateList()
}

function prevYear() {
  dateYear--;
  changeYear()
}

function nextYear() {
  dateYear++;
  changeYear()
}

function changeMonth() {
  var _month = $('.month');
  _month.innerHTML = dateMonth;
  setDateList()
}

function prevMonth() {
  dateMonth--;
  if (dateMonth < 1) {
    dateMonth = 12;
    prevYear()
  }
  changeMonth()
}

function nextMonth() {
  dateMonth++;
  if( dateMonth > 12) {
    dateMonth = 1;
    nextYear()
  }
  changeMonth()
}

let prevBtn = $('.prev-month');
let nextBtn = $('.next-month');

prevBtn.onclick = function () {
  imgChange();
  prevMonth();
}

nextBtn.onclick = function () {
  imgChange();
  nextMonth();
}
