import React, { useState, useEffect } from 'react';

const TimeComponent = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await fetch('https://api.timeapi.io/current/zone?timezone=UTC');
        if (!response.ok) {
          throw new Error('Failed to fetch time data');
        }
        const data = await response.json();
        setCurrentTime(data.date_time_txt);
      } catch (error) {
        console.error('Error fetching time:', error);
        // Fallback to local time if API request fails
        setCurrentTime(new Date().toLocaleString());
      }
    };

    fetchTime();

    // Fetch the time every 10 seconds
    const intervalId = setInterval(fetchTime, 10000);

    return () => clearInterval(intervalId); // Cleanup interval
  }, []);

  return (
    <div style={{ position: 'fixed', top: '10px', right: '10px',marginTop:'43%' }} >
      <h5 style={{color:'darkblue'}}>Current Time:</h5>
      <p style={{marginLeft:'5%'}}>{currentTime}</p>
    </div>
  );
};

export default TimeComponent;
