function $(ele) {
  return document.querySelector(ele);
}
let _Date = new Date();
let dateYear = _Date.getFullYear();
let dateMonth = _Date.getMonth() + 1; // Month is 1-indexed for display
let dateDay = _Date.getDate();
let _year = $('.year');
let _month = $('.month');
let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let selectedDate = null;

function setDate() {
  _year.innerHTML = `${dateYear}`;    
  _month.innerHTML = `${monthNames[dateMonth - 1]}`;
}

let weekArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
let weekList = document.querySelector('.week-list');

function setWeekList() {
  weekList.innerHTML = '';
  for (let i = 0; i < weekArr.length; i++) {
      weekList.innerHTML += `<li>${weekArr[i]}</li>`;
  }
}

function startWeek() {
  return new Date(dateYear, dateMonth - 1, 1).getDay(); // Month is 0-indexed
}

function allDate(year, month) {
  return new Date(year, month, 0).getDate(); // Get last date of the previous month
}

function setDateList() {
  let _date = allDate(dateYear, dateMonth);
  let _week = startWeek();
  let prevDateLen = allDate(dateYear, dateMonth - 1);
  let dateList = $('.day-list');
  dateList.innerHTML = '';
  
  // Previous month days
  for (let index = _week; index > 0; index--) {
      dateList.innerHTML += `<li class="pas" data-month="prev">${prevDateLen - index + 1}</li>`;
  }
  
  // Current month days
  for (let index = 1; index <= _date; index++) {
      let li = `<li data-month="current">${index}</li>`;
      if (
        _year.textContent == new Date().getFullYear() && 
        _month.textContent == monthNames[new Date().getMonth()] && 
        index == new Date().getDate()
    ) {
          li = `<li class="active" data-month="current">${index}</li>`;
      }
      dateList.innerHTML += li;
  }
  
  // Next month days
  let totalDays = 42; // Display 6 weeks
  let allLi = document.querySelectorAll('.day-list li');
  for (let index = 1; allLi.length + index <= totalDays; index++) {
      dateList.innerHTML += `<li class="pas" data-month="next">${index}</li>`;
  }
  
  // Add click event listeners to all date cells
  document.querySelectorAll('.day-list li').forEach(li => {
      li.addEventListener('click', function() {
          // Remove previous selection
          if (selectedDate) {
              selectedDate.classList.remove('selected');
          }
          
          // Don't select past/future month dates
          if (this.classList.contains('pas')) return;
          
          // Add selected class
          this.classList.add('selected');
          selectedDate = this;
          
          // Optional: Log selected date details
          console.log(`Selected Date: ${this.textContent} ${_month.textContent} ${_year.textContent}`);
      });
  });
}

setDate();
setWeekList();
setDateList();

function changeMonth() {
  selectedDate = null; // Reset selected date when changing months
  setDate();
  setDateList();
}

function prevMonth() {
  dateMonth--;
  if (dateMonth < 1) {
      dateMonth = 12;
      dateYear--;
  }
  changeMonth();
}

function nextMonth() {
  dateMonth++;
  if (dateMonth > 12) {
      dateMonth = 1;
      dateYear++;
  }
  changeMonth();
}

let prevBtn = $('.prev-month');
let nextBtn = $('.next-month');
prevBtn.onclick = prevMonth;
nextBtn.onclick = nextMonth;
