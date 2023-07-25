import React from 'react';
import Typography from '@mui/material/Typography';

const GreetingMessage = () => {
  const getGreetingMessage = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 4 && currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 17) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  const greeting = getGreetingMessage();

  return (
    <Typography variant="h4">
      {greeting},
    </Typography>
  );
};

export default GreetingMessage;
