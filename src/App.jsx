import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PomodoroProvider } from './context/PomodoroContext';
import { SidebarProvider } from './context/SidebarContext';
import { TodoProvider } from './context/TodoContext';

import Home from './pages/home';
import Finance from './pages/finance';
import PrivateRoute from './PrivateRoute';
import Sidebar from './components/sidebar';
import Weekplanner from './pages/weekplanner';
import Todo from './pages/todo';
import Pomodoro from './pages/pomodoro';
import Stats from './pages/stats';
import Settings from './pages/settings';

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
        <TodoProvider>
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
              <Route path="/settings" element={<Settings/>} />
            </Routes>
          </div>
        </PomodoroProvider>
        </TodoProvider>
        </SidebarProvider>
      </Router>
  )
}

export default App;