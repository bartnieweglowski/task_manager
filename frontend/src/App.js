import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Board from './Board/Board';
import Communication from './Communication/Communication';
import CreateProject from './Create_project/Create_project';
import ManageTasks from './Manage_tasks/Manage_tasks';
import ProgressMonitoring from './Progress_monitoring/Progress_monitoring';
import Notifications from './Notifications/Notifications';
import TimeTracking from './TimeTracking/TimeTracking'; 
import './ColorSwitcher/switcher.scss'


const App = () => {

  const [colorTheme, setColorTheme] = useState('theme-white');
  
  useEffect(()=> {
      const currentThemeColor = localStorage.getItem('theme-color');
  
      if (currentThemeColor) {
          setColorTheme(currentThemeColor);
      }
  }, []);
  
  const handleClick = (theme) => {
  setColorTheme(theme);
  localStorage.setItem('theme-color', theme)
  }
  
  return (
    <Router>
      <div className={`App ${colorTheme}`}>
        <div className='title-container'>
        <div className="title">
          <h1>Project Management Platform</h1>
          </div>
          <div className='theme-options-container'>
          <div className="theme-options">
            <div id='theme-white'
            onClick={() => handleClick('theme-white')}
            className={`${colorTheme === 'theme-white' ? 'active' : ''}`}
            />
            <div id="theme-blue"
            onClick={() => handleClick('theme-blue')}
            className={`${colorTheme === 'theme-blue' ? 'active' : ''}`}
            />
            <div id="theme-orange"
            onClick={() => handleClick('theme-orange')}
            className={`${colorTheme === 'theme-orange' ? 'active' : ''}`}
            />
            <div id="theme-purple"
            onClick={() => handleClick('theme-purple')}
            className={`${colorTheme === 'theme-purple' ? 'active' : ''}`}
            />
            <div id="theme-green"
            onClick={() => handleClick('theme-green')}
            className={`${colorTheme === 'theme-green' ? 'active' : ''}`}
            />
            <div id="theme-black"
            onClick={() => handleClick('theme-black')}
            className={`${colorTheme === 'theme-black' ? 'active' : ''}`}
            />
          </div>
        </div>
      </div>
        <header>  
          <nav>
            <ul>
              <li>
                <Link to="/board">Board</Link>
              </li>
              <li>
                <Link to="/create-project">Create Project</Link>
              </li>
              <li>
                <Link to="/manage-tasks">Manage Tasks</Link>
              </li>
              <li>
                <Link to="/progress-monitoring">Progress Monitoring</Link>
              </li>
              <li>
                <Link to="/communication">Communication</Link>
              </li>
              <li>
                <Link to="/notifications">Notifications</Link>
              </li>
              <li>
                <Link to="/time-tracking">Time Tracking</Link>
              </li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/board" element={<Board />} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/manage-tasks" element={<ManageTasks />} />
          <Route path="/progress-monitoring" element={<ProgressMonitoring />} />
          <Route path="/communication" element={<Communication />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/time-tracking" element={<TimeTracking />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
