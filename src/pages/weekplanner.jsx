import React, { useState, useEffect } from 'react';
import '../styles/weekplanner.css';

function Weekplanner({ events = [] }) { // Default to an empty array
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthYear, setMonthYear] = useState('');

  useEffect(() => {
      renderCalendar(currentDate);
  }, [currentDate]);

  const renderCalendar = (date) => {
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      const totalDays = lastDay.getDate();
      const startDay = (firstDay.getDay() + 6) % 7; // Adjusting to start from Monday

      setMonthYear(date.toLocaleString('default', { month: 'long', year: 'numeric' }));

      const dateGrid = document.querySelector('.date-grid');
      dateGrid.innerHTML = ''; // Clear previous dates

      // Fill in blank days at the start of the month
      for (let i = 0; i < startDay; i++) {
          const blankDay = document.createElement('div');
          dateGrid.appendChild(blankDay);
      }

      // Fill in the days of the month
      for (let day = 1; day <= totalDays; day++) {
          const dateElement = document.createElement('div');
          dateElement.textContent = day;
          dateElement.classList.add('date');
          dateGrid.appendChild(dateElement);
      }
  };

  const handlePrev = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNext = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
      <div className='calendar-container'>
          <div className='calendar-header'>
              <button className='prev' onClick={handlePrev}>Previous</button>
              <h2 id="monthYear">{monthYear}</h2>
              <button className='next' onClick={handleNext}>Next</button>
          </div>

          <div className='calendar-days'>
              <div className='day'>Mon</div>
              <div className='day'>Tue</div>
              <div className='day'>Wed</div>
              <div className='day'>Thu</div>
              <div className='day'>Fri</div>
              <div className='day'>Sat</div>
              <div className='day'>Sun</div>
          </div>

          <div className='date-grid'></div>

          <div className="events">
              <h3>Upcoming Events</h3>
              <ul>
                  {Array.isArray(events) && events.length > 0 ? (
                      events.map((event) => (
                          <li key={event.id}>
                              {event.summary} - {event.start.dateTime || event.start.date}
                          </li>
                      ))
                  ) : (
                      <li>No events available</li> // Fallback when no events are present
                  )}
              </ul>
          </div>
      </div>
  );
}

export default Weekplanner;
