import { useState } from 'react';
import { getMonthGrid } from 'src/utils/calendar';
import type { CalendarType } from 'src/types/calendarTypes';
import { Day } from 'src/components/calendar/Day';
import styles from 'src/components/calendar/calendar.module.css';


const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Calendar = ({calendar}: {calendar: CalendarType}) => {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    const days = getMonthGrid(currentYear, currentMonth);

    const nextMonth = () => {
        if (currentMonth === 11) {
          setCurrentMonth(0);
          setCurrentYear(y => y + 1);
        } else {
          setCurrentMonth(m => m + 1);
        }
      };
    
      const prevMonth = () => {
        if (currentMonth === 0) {
          setCurrentMonth(11);
          setCurrentYear(y => y - 1);
        } else {
          setCurrentMonth(m => m - 1);
        }
    };

    return <div className={styles['calendar']}>
        <div className={styles['calendar-header']}>
            <h2>{calendar.name}</h2>
        </div>  
        <div className={styles['calendar-month-select']}>
            <button onClick={prevMonth}>◀</button>
                {new Date(currentYear, currentMonth).toLocaleString('default', {
                    month: 'long',
                })}
                {' '}
                {currentYear}
            <button onClick={nextMonth}>▶</button>
        </div>
        <div className={styles['calendar-weekdays']}>
            {WEEKDAYS.map(d => (
                <div key={d}>{d}</div>
            ))}
        </div>
        <div className={styles['calendar-grid']}>
            {days.map((date) => {
                const isToday = date.toDateString() === today.toDateString();
                const isCurrentMonth = date.getMonth() === currentMonth;

                return <Day 
                    key={date.toISOString()}
                    date={date}
                    isCurrentMonth={isCurrentMonth}
                    isToday={isToday}
                />
            })}
        </div>
    </div>;
};


export default Calendar;