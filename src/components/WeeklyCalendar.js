import React, { useState, useEffect } from 'react';

const WeeklyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekDates, setWeekDates] = useState([]);
  const [yellowBlocks, setYellowBlocks] = useState([]);
  const [reward, setReward] = useState(null);
  const [showReward, setShowReward] = useState(false);

  // Calculate the dates for the current week (Monday to Sunday)
  useEffect(() => {
    const today = new Date();
    const day = today.getDay(); // 0 for Sunday, 1 for Monday, etc.
    
    // Calculate the date for Monday of the current week
    const monday = new Date(today);
    monday.setDate(today.getDate() - (day === 0 ? 6 : day - 1));
    
    // Create array of dates for the week
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      dates.push(date);
    }
    
    setWeekDates(dates);
    
    // Set 4 random yellow blocks
    generateRandomBlocks();
    
    // Update current date every minute to detect day changes
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Generate 4 random unique day indices (0-6) for yellow blocks
  const generateRandomBlocks = () => {
    const blocks = new Set();
    while (blocks.size < 4) {
      blocks.add(Math.floor(Math.random() * 7));
    }
    setYellowBlocks(Array.from(blocks));
  };
  
  // Check if a day is today
  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };
  
  // Handle click on a yellow block
  const handleBlockClick = (dayIndex) => {
    // Only allow clicking if it's the current day
    const clickedDate = weekDates[dayIndex];
    if (isToday(clickedDate) && yellowBlocks.includes(dayIndex)) {
      // Randomly select "high dopamine" or "low dopamine"
      const result = Math.random() < 0.5 ? "High Dopamine" : "Low Dopamine";
      setReward(result);
      setShowReward(true);
    }
  };
  
  // Format date as "Mon, Apr 15"
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };
  
  // Day names
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-4 bg-gray-50 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Weekly Calendar: {currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</h2>
      
      <div className="w-full grid grid-cols-7 gap-2 mb-4">
        {dayNames.map((name, index) => (
          <div key={`header-${index}`} className="text-center font-semibold">
            {name.substring(0, 3)}
          </div>
        ))}
      </div>
      
      <div className="w-full grid grid-cols-7 gap-2">
        {weekDates.map((date, index) => {
          const isYellowBlock = yellowBlocks.includes(index);
          const isTodayDate = isToday(date);
          const isClickable = isYellowBlock && isTodayDate;
          
          return (
            <div 
              key={`day-${index}`}
              className={`relative h-24 p-2 rounded-lg border ${isYellowBlock ? 'bg-yellow-200' : 'bg-white'} 
                         ${isTodayDate ? 'border-blue-500 border-2' : 'border-gray-200'} 
                         ${isClickable ? 'cursor-pointer hover:bg-yellow-300' : ''}`}
              onClick={() => handleBlockClick(index)}
            >
              <div className="text-right text-sm">
                {date.getDate()}
              </div>
              <div className="absolute bottom-2 left-2 right-2 text-xs text-gray-500">
                {formatDate(date)}
              </div>
              {isYellowBlock && isTodayDate && (
                <div className="mt-2 text-xs text-center text-gray-700">
                  Click for reward
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {showReward && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
            <h3 className="text-2xl font-bold mb-4">Your Reward</h3>
            <p className="text-3xl mb-6 font-bold text-purple-600">{reward}</p>
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setShowReward(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-500">
        <p>Yellow blocks represent reward opportunities. You can only click on a yellow block if it's the current day.</p>
        <p>The calendar will update with new yellow blocks each week.</p>
      </div>
    </div>
  );
};

export default WeeklyCalendar;