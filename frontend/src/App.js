import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Board from './Board/Board';
import './ColorSwitcher/switcher.scss'
import './style/style.css'
import { CardsContext } from './Board/Board';
import CalendarView from './Calendar/CalendarView';
import TimeTracking from './TimeTracking/TimeTracking';
import Dashboard from './Dashboard/Dashboard.';





const App = () => {
  const [cards, setCards] = useState([]);
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
                <Link to="/calendar">Calendar</Link>
              </li>
              <li>
                <Link to="/time-tracking">Time Tracking</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            </ul>
          </nav>
        </header>
        <CardsContext.Provider value={{ cards, setCards }}>
        <Routes>
        
          <Route path="/board" element={<Board />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/time-tracking" element={<TimeTracking />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
        </Routes>
        </CardsContext.Provider>
      </div>
    </Router>
  );
};



export default App;
