import React from "react";
import { Modal, StyleSheet, View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import * as ImagePicker from "react-native-image-picker";
import ShadowedButton from "../Buttons/ShadowedButton";
const PhotoSelectorModal = ({ setVisible, setResponse, visible }) => {
  const { t } = useTranslation();

  const imagePickerCallback = (response) => {
    setResponse(response);
    setVisible(false);
  };
  const launchCamera = async (options) => {
    ImagePicker.launchCamera(options, (response) =>
      imagePickerCallback(response)
    );
  };

  const launchImageLibrary = (options) => {
    ImagePicker.launchImageLibrary(options, (response) =>
      imagePickerCallback(response)
    );
  };

  return (
    <Modal
      onDismiss={() => setVisible(false)}
      onRequestClose={() => setVisible(false)}
      animationType="slide"
      transparent={true}
      visible={visible}
    >
      <View style={modalStyles.modalContainer}>
        <Text style={modalStyles.text}>{t("Select or Take a photo")}</Text>
        <View style={modalStyles.buttons}>
          <ShadowedButton
            buttonStyles={modalStyles.button}
            onPress={() =>
              launchCamera({ mediaType: "photo", saveToPhotos: true })
            }
          >
            <Text style={modalStyles.buttonText}>{t("Take a Phoho")}</Text>
          </ShadowedButton>
          <ShadowedButton
            buttonStyles={modalStyles.button}
            onPress={() => launchImageLibrary({ mediaType: "photo" })}
          >
            <Text style={modalStyles.buttonText}>
              {t("Select from Gallery")}
            </Text>
          </ShadowedButton>
        </View>
      </View>
    </Modal>
  );
};

const modalStyles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#fff",
    width: 340,
    height: 340,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: "30%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 20,
  },
  textInput: {
    borderColor: "#DCEBEB",
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 20,
    width: 210,
    height: 57,
  },
  text: {
    fontSize: 21,
    marginBottom: 10,
    textAlign: "center",
    width: 210,
  },
  buttons: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: 130,
  },
  buttonText: {
    fontSize: 14,
    textAlign: "center",
  },
});

export default PhotoSelectorModal;
