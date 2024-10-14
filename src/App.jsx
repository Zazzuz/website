import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider  } from './context/AuthContext';
import { PomodoroProvider } from './context/PomodoroContext';
import { SidebarProvider } from './context/SidebarContext';
import { TodoProvider } from './context/TodoContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { gapi } from 'gapi-script';

import Home from './pages/home';
import Login from './pages/login';
import Finance from './pages/finance';
import Sidebar from './components/sidebar';
import Weekplanner from './pages/weekplanner';
import Todo from './pages/todo';
import Pomodoro from './pages/pomodoro';
import Stats from './pages/stats';
import Settings from './pages/settings';

import PrivateRoute from './PrivateRoute';
import ReactDOM from 'react-dom/client';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  </QueryClientProvider>
);

function App() {
  const CLIENT_ID = import.meta.env.VITE_GOOGLE_ID;
  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  const DISCOVERY_DOCS = import.meta.env.VITE_DISCOVERY_DOCS;
  const SCOPES = import.meta.env.VITE_SCOPES;
  // State to hold events
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadGapi = () => {
      const script = document.createElement('script');
      script.src = import.meta.env.VITE_GOOGLE_SRC;
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => {
        gapi.load('client:auth2', start);
      };
    };

    const start = () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      }).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        authInstance.isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(authInstance.isSignedIn.get());
      }).catch((error) => {
        console.error("Error initializing Google API client: ", error);
      });
    };
    

    loadGapi();
  }, []);

  const updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
      listUpcomingEvents();
    } else {
      gapi.auth2.getAuthInstance().signIn().catch((error) => {
        console.error("Error signing in: ", error);
      });
    }
  };

  const listUpcomingEvents = () => {
    gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'maxResults': 10,
      'singleEvents': true,
      'orderBy': 'startTime'
    }).then((response) => {
      const events = response.result.items;
      setEvents(events);
      if (events.length > 0) {
        events.forEach((event) => {
          const when = event.start.dateTime || event.start.date;
          console.log(`${event.summary} (${when})`);
        });
      } else {
        console.log('No upcoming events found.');
      }
    }).catch((error) => {
      console.error("Error fetching events: ", error);
    });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <SidebarProvider>  
            <TodoProvider>
              <PomodoroProvider>
                <div>
                  <Sidebar />
                  <Routes>
                    <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/finance" element={<PrivateRoute><Finance /></PrivateRoute>} />
                    <Route path="/weekplanner" element={<PrivateRoute><Weekplanner events={events} /></PrivateRoute>} />
                    <Route path="/todo" element={<PrivateRoute><Todo /></PrivateRoute>} />
                    <Route path="/pomodoro" element={<PrivateRoute><Pomodoro /></PrivateRoute>} />
                    <Route path="/stats" element={<PrivateRoute><Stats /></PrivateRoute>} />
                    <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
                  </Routes>
                </div>
              </PomodoroProvider>
            </TodoProvider>
          </SidebarProvider>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
