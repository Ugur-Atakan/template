import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../styles/colors";
import { FontAwesome } from "@expo/vector-icons";

interface PasswordInputProps {
  password: string;
  setPassword: (text: string) => void;
  placeholder: string;
  extraStyles?: TextInput["props"]["style"];
  extraProps?: TextInput["props"];
}

const PasswordInput = ({
  password,
  setPassword,
  placeholder,
  extraStyles,
  extraProps,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View
      style={{
        position: "relative",
      }}
    >
      <TextInput
        placeholderTextColor={COLORS.primaryPlaceholder}
        aria-label="password-input"
        secureTextEntry={!showPassword}
        placeholder={placeholder}
        value={password}
        style={[styles.input, extraStyles]}
        onChangeText={setPassword}
        {...extraProps}
      />
      <TouchableOpacity
        style={{
          zIndex: 1,
          position: "absolute",
          right: 15,
          top: 15,
        }}
        onPress={() => setShowPassword(!showPassword)}
      >
        <FontAwesome
          name={showPassword ? "eye" : "eye-slash"}
          color="#ccc"
          size={26}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PasswordInput;

const styles = StyleSheet.create({
  input: {
    borderColor: "#DCEBEB",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 20,
    height: 57,
    fontSize: 16,
    width: 300,
  },
});
