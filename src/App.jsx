import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PomodoroProvider } from './context/PomodoroContext';
import { SidebarProvider } from './context/SidebarContext';

import Home from './pages/home';
import Finance from './pages/finance';
import PrivateRoute from './PrivateRoute';
import Sidebar from './components/sidebar';
import Weekplanner from './pages/weekplanner';
import Todo from './pages/todo';
import Pomodoro from './pages/pomodoro';
import Stats from './pages/stats';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
)

function App() {
  return (
      <Router>
        <SidebarProvider>  
        <PomodoroProvider>
          <div>
            <Sidebar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/finance" element={<Finance/>} />
              <Route path="/weekplanner" element={<Weekplanner/>} />
              <Route path="/todo" element={<Todo/>} />
              <Route path="/pomodoro" element={<Pomodoro/>} />
              <Route path="/stats" element={<Stats/>} />
            </Routes>
          </div>
        </PomodoroProvider>
        </SidebarProvider>
      </Router>
  )
}

export default App;