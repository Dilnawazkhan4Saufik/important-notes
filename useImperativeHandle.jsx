import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { View, Button, Text, SafeAreaView } from 'react-native';

// Child component
const ChildComponent = forwardRef((props, ref) => {
  const showMessage = () => {
    console.log('Hello from ChildComponent');
  };

  const printMsg = () => {
    console.log('Hello from printMsg');
  };

  useImperativeHandle(ref, () => ({
    showMessage,
    printMsg,
  }));

  return (
    <View>
      <Text>This is the ChildComponent</Text>
      <Button title='Show Message' onPress={showMessage} />
    </View>
  );
});

// Parent componente
export const Dashboard = () => {
  const childRef: any = useRef(null);

  const handleButtonClick = () => {
    childRef.current?.printMsg();
  };

  return (
    <SafeAreaView>
      <ChildComponent ref={childRef} />
      <Button title='Show Message' onPress={handleButtonClick} />
    </SafeAreaView>
  );
};
