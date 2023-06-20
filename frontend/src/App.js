import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Board from './Board/Board';
import Communication from './Communication/Communication';
import CreateProject from './Create_project/Create_project';
import ManageTasks from './Manage_tasks/Manage_tasks';
import ProgressMonitoring from './Progress_monitoring/Progress_monitoring';
import Notifications from './Notifications/Notifications';
import TimeTracking from './TimeTracking/TimeTracking';

const App = () => {
  return (
    <Router>
      <div>
        <div className="title">
          <h1>Project Management Platform</h1>
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
