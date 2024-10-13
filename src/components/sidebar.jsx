import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toggleIcon from '../assets/layout-sidebar.svg';
import { useSidebar } from '../context/SidebarContext';
import homeIcon from '../assets/house.svg';
import statsIcon from '../assets/bar-chart.svg';
import weekplannerIcon from '../assets/calendar3.svg';
import financeIcon from '../assets/credit-card.svg';
import todoIcon from '../assets/clipboard-check.svg';
import pomodoroIcon from '../assets/clock.svg';

import '../styles/sidebar.css';

function Sidebar() {
  // State to track if the sidebar is collapsed or expanded
  const{ isCollapsed, setIsCollapsed, toggleSidebar} = useSidebar();

 
  return (
    <div className={`sidebar-container ${isCollapsed ? 'collapsed' : ''}`}>
      <nav className="sideBar">
        {/* Toggle Button */}
        <button className="toggle-button" onClick={toggleSidebar}>
          <img src={toggleIcon} alt="Toggle Sidebar" />
        </button>
        <ul>
          <li id="homeLink">
            <Link to="/">
              <img src={homeIcon} alt="Home" />
              <span className={`link-text ${isCollapsed ? 'hidden' : ''}`}>Home</span>
            </Link>
          </li>
          <li id="pomodoroLink">
            <Link to="/pomodoro">
              <img src={pomodoroIcon} alt="Pomodoro" />
              <span className={`link-text ${isCollapsed ? 'hidden' : ''}`}>Pomodoro</span>
            </Link>
          </li>
          <li id="todoLink">
            <Link to="/todo">
              <img src={todoIcon} alt="Todo" />
              <span className={`link-text ${isCollapsed ? 'hidden' : ''}`}>TODO List</span>
            </Link>
          </li>
          <li id="weekplannerLink">
            <Link to="/weekplanner">
              <img src={weekplannerIcon} alt="Weekplanner" />
              <span className={`link-text ${isCollapsed ? 'hidden' : ''}`}>Week Planner</span>
            </Link>
          </li>
          <li id="statsLink">
            <Link to="/stats">
              <img src={statsIcon} alt="Stats" />
              <span className={`link-text ${isCollapsed ? 'hidden' : ''}`}>Stats</span>
            </Link>
          </li>
          <li id="financeLink">
            <Link to="/finance">
              <img src={financeIcon} alt="Finance" />
              <span className={`link-text ${isCollapsed ? 'hidden' : ''}`}>Financial Tracker</span>
            </Link>
          </li>
        </ul>
      </nav>
      

    </div>
  );
}

export default Sidebar;
