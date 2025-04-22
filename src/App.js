import React from 'react';
import './App.css';
import WeeklyCalendar from './components/WeeklyCalendar';

function App() {
  return (
    <div className="App" style={{ 
      backgroundColor: '#282c34', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px'
    }}>
      <header style={{ 
        color: 'white',
        marginBottom: '30px'
      }}>
        <h1>Weekly Calendar with Random Rewards</h1>
      </header>
      <main style={{ width: '100%', maxWidth: '1000px' }}>
        <WeeklyCalendar />
      </main>
    </div>
  );
}

export default App;