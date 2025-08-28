function getCalendarStart(year: number, month: number) {
    const firstOfMonth = new Date(year, month, 1);
    let dayOfWeek = firstOfMonth.getDay();

    dayOfWeek = (dayOfWeek + 6) % 7;

    const start = new Date(year, month, 1 - dayOfWeek);
    return start;
}


function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
}


// Display always 6 weeks in month grids for consistency
function getMonthGrid(year: number, month: number) {
    const startDate = getCalendarStart(year, month);
    const days = [];

    for (let i = 0; i < 42; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      days.push(d);
    }

    return days;
  }


export {
    getCalendarStart,
    getDaysInMonth,
    getMonthGrid,
};