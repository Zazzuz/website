import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PomodoroProvider } from './context/PomodoroContext';
import { SidebarProvider } from './context/SidebarContext';
import { TodoProvider } from './context/TodoContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { gapi } from 'gapi-script';

import Home from './pages/home';
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
      <App />
    </React.StrictMode>
  </QueryClientProvider>
);

function App() {
  const CLIENT_ID = '525306354667-ralakjfn5q052l6917b5v548ruiaf2jm.apps.googleusercontent.com';
  const API_KEY = 'AIzaSyCoRMIfAoBJGotUgZxwgn87DMasBl6bHKs';
  const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
  // State to hold events
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadGapi = () => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
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
    <Router>
      <SidebarProvider>  
        <TodoProvider>
          <PomodoroProvider>
            <div>
              <Sidebar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/finance" element={<Finance />} />
                <Route path="/weekplanner" element={<Weekplanner events={events} />} />
                <Route path="/todo" element={<Todo />} />
                <Route path="/pomodoro" element={<Pomodoro />} />
                <Route path="/stats" element={<Stats />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </PomodoroProvider>
        </TodoProvider>
      </SidebarProvider>
    </Router>
  );
}

export default App;
