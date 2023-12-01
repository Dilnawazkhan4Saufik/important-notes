import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';

//EXAMPLE ONE

const FiveMinuteTimerScreen = () => {
  // 1 second = 1000 miliseconds ----> 300*1000 = 300,000 = 5 minutes
  const [timer, setTimer] = useState(300); // 300 seconds = 5 minutes

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    // Clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Format timer value as MM:SS using moment
  const timerText = moment.utc(timer * 1000).format('mm:ss');

  return (
    <View>
      <Text>{timerText}</Text>
    </View>
  );
};

//EXAMPLE TWO

const NotificationsTab = () => {
  const [timer, setTimer] = useState(300); // 300 seconds = 5 minutes

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    // Clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Format timer value as MM:SS
  const minutes = Math.floor(timer / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (timer % 60).toString().padStart(2, '0');
  const timerText = `${minutes}:${seconds}`;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{timerText}</Text>
      <FiveMinuteTimerScreen />
    </View>
  );
};

export { NotificationsTab };
