import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface LinearFilledButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  linearGradientColors?: string[];
  linearGradientStyles?: LinearGradient["props"]["style"];
  buttonStyles?: TouchableOpacity["props"]["style"];
}

const LinearFilledButton = ({
  children,
  onPress,
  linearGradientStyles,
  buttonStyles,
  linearGradientColors,
}: LinearFilledButtonProps) => {
  return (
    <TouchableOpacity style={[{ zIndex: 99 }, buttonStyles]} onPress={onPress}>
      <LinearGradient
        colors={
          linearGradientColors ?? ["#CEDAFC", "#DFE2F6", "#FBF1E7", "#D4E6E6"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.buttonContainer, linearGradientStyles]}
      >
        {children}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default LinearFilledButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 60,
    zIndex: 999,
  },
});
