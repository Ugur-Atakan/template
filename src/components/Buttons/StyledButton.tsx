import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface StyledButtonProps {
  onPress?: () => void;
  children: React.ReactNode;
  extraStyles?: TouchableOpacity['props']['style'];
  extraProps?: TouchableOpacityProps;
}

const StyledButton = ({
  children,
  extraStyles,
  extraProps,
  onPress,
}: StyledButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, extraStyles]}
      {...extraProps}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 20,
    height: 57,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StyledButton;
