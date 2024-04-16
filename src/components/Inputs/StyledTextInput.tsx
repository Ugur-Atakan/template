import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {COLORS} from '../../styles/colors';

interface StyledTextInputProps {
  placeholder: string;
  value: string;
  setValue: (text: string) => void;
  extraStyles?: TextInput['props']['style'];
  extraProps?: TextInput['props'];
}

const StyledTextInput = ({
  placeholder,
  value,
  setValue,
  extraStyles,
  extraProps,
}: StyledTextInputProps) => {
  return (
    <TextInput
      placeholderTextColor={COLORS.primaryPlaceholder}
      placeholder={placeholder}
      onChangeText={setValue}
      value={value}
      style={[styles.textInput, extraStyles]}
      {...extraProps}
    />
  );
};

export default StyledTextInput;

const styles = StyleSheet.create({
  textInput: {
    borderColor: '#DCEBEB',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 20,
    height: 57,
    fontSize: 16,
    width: 300,
  },
});
