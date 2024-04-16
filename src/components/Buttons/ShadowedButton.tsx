import React from "react";
import { Shadow, ShadowProps } from "react-native-shadow-2";
import { StyleSheet, TouchableOpacity } from "react-native";

interface ShadowedButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  buttonStyles?: TouchableOpacity["props"]["style"];
  shadowStyles?: ShadowProps["style"];
  shadowViewStyles?: ShadowProps["shadowViewProps"];
}
const ShadowedButton = ({
  onPress,
  buttonStyles,
  shadowViewStyles,
  shadowStyles,
  children,
}: ShadowedButtonProps) => {
  return (
    <Shadow
      distance={7}
      paintInside={false}
      stretch={true}
      startColor={"rgba(128, 182, 192, 1)"}
      endColor={"rgba(255, 255, 255, 0.1)"}
      style={[styles.shadowedButton, shadowStyles]}
      containerStyle={{ zIndex: 999, borderRadius: 20, height: 57 }}
      shadowViewProps={shadowViewStyles}
      offset={[0, 3]}
    >
      <TouchableOpacity
        onPress={onPress}
        style={[styles.buttonContainer, buttonStyles]}
      >
        {children}
      </TouchableOpacity>
    </Shadow>
  );
};

export default ShadowedButton;

const styles = StyleSheet.create({
  shadowedButton: {
    marginBottom: 15,
    width: "100%",
    height: 57,
    borderRadius: 12,
    zIndex: 2,
  },
  buttonContainer: {
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 57,
    zIndex: 999,
  },
});
