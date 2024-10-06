import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';

function Sidebar() {
  return (
    <nav className="sideBar">
      <ul>
          <li id="homeLink"><Link to="/">Home</Link></li>
          <li id="pomodoroLink"><Link to="/pomodoro">Pomodoro</Link></li>
          <li id="todoLink"><Link to="/todo">TODO List</Link></li>
          <li id="weekplannerLink"><Link to="/weekplanner">Week Planner</Link></li>
          <li id="statsLink"><Link to="/stats">Stats</Link></li>
          <li id="financeLink"><Link to="/finance">Financial Tracker</Link></li>
      </ul>
    </nav>
  );
}

export default Sidebar;