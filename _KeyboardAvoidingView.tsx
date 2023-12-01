import React, { useState, useEffect, FC } from 'react';
import { Keyboard, View, Dimensions, Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    bottom: 0,
  },
});

interface _KeyboardAvoidingViewInterface {
  style?: any;
  onToggle: any;
}

export const _KeyboardAvoidingView: FC<_KeyboardAvoidingViewInterface> = ({
  style,
  onToggle = () => null,
}) => {
  const [keyboardSpace, setKeyboardSpace] = useState(0);

  useEffect(() => {
    const updateKeyboardSpace = (event: any) => {
      if (!event.endCoordinates) {
        return;
      }

      const screenHeight = Dimensions.get('window').height;
      const newKeyboardSpace = screenHeight - event.endCoordinates.screenY;
      setKeyboardSpace(newKeyboardSpace);
      onToggle(true, newKeyboardSpace);
    };
    const showEvt =
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
    const showListener = Keyboard.addListener(showEvt, updateKeyboardSpace);

    const resetKeyboardSpace = () => {
      setKeyboardSpace(0);
      onToggle(false, 0);
    };
    const hideEvt =
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';
    const hideListener = Keyboard.addListener(hideEvt, resetKeyboardSpace);

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  return <View style={[styles.container, { height: keyboardSpace }, style]} />;
};
