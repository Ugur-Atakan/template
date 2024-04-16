import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { hideModal } from "../../redux/reducers/commonReducer";
import StyledButton from "../Buttons/StyledButton";
import { COLORS } from "../../styles/colors";
import { ErrorIconSVG, SuccesIconSVG } from "../../../assets/images/svg";

const GlobalModal = () => {
  const { visible, content, autoHide } = useAppSelector(
    (state) => state.common.modal
  );
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(hideModal());
  };
  if (autoHide && visible) {
    setTimeout(() => {
      dispatch(hideModal());
    }, 1000);
  }
  return (
    <Modal
      onRequestClose={closeModal}
      animationType="slide"
      visible={visible}
      transparent={true}
    >
      <View style={modalStyles.container}>
        {content?.type === "Error" ? <ErrorIconSVG /> : <SuccesIconSVG />}
        <Text style={modalStyles.title}>{content?.title}</Text>
        <Text style={modalStyles.description}>{content?.description}</Text>
        <View style={modalStyles.buttonGroup}>
          <StyledButton extraStyles={modalStyles.button} onPress={closeModal}>
            <Text>Ok</Text>
          </StyledButton>
        </View>
      </View>
    </Modal>
  );
};

export default GlobalModal;

const modalStyles = StyleSheet.create({
  container: {
    width: 324,
    height: 339,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.darkGray,
    borderRadius: 34,
    position: "absolute",
    top: "30%",
    alignSelf: "center",
  },

  button: {
    backgroundColor: COLORS.lightGray2,
    borderRadius: 12,
    minWidth: 300,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  title: {
    fontSize: 22,
    color: COLORS.white,
    fontWeight: "800",
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: COLORS.white,
    fontWeight: "400",
    textAlign: "center",
    width: 200,
    marginBottom: 20,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
