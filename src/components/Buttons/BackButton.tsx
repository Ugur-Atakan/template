import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {BackButtonSVG} from '../../../assets/images/svg';

interface BackButtonProps {
  color?: string;
  onPress?: () => void;
  extraStyles?: TouchableOpacity['props']['style'];
}
export const BackButton = ({color, onPress, extraStyles}: BackButtonProps) => {
  return (
    <TouchableOpacity style={[styles.container, extraStyles]} onPress={onPress}>
      <BackButtonSVG color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 42,
    width: 42,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
