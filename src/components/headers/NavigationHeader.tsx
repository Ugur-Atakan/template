import React from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../styles/colors";
import { useRoute } from "@react-navigation/native";
import { BackButton } from "../Buttons/BackButton";
import useUserManagement from "../../utils/hooks/useUserManagement";

interface NavHeaderProps {
  headerType: string;
  pageName: string;
}

export const NavigationHeader = ({ headerType, pageName }: NavHeaderProps) => {
  const navigation = useNavigation();
  const { logOutUser } = useUserManagement();

  const route = useRoute();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.backButtonContainer}>
        <BackButton
          onPress={() => navigation.goBack()}
          color={headerType === "green" ? "green" : "pink"}
        />
      </View>
      <View style={styles.pageNameContainer}>
        <Text style={styles.pageNameText}>{pageName}</Text>
      </View>
      <View style={styles.logoutButtonContainer}>
        {route.name === "Screen1" && (
          <TouchableOpacity onPress={logOutUser} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: Platform.select({
    ios: {
      flexDirection: "row",
      alignItems: "center",
      height: 100,
      paddingTop: 20,
      shadowColor: "#ccc",
      elevation: 5,
      backgroundColor: "#FFFFFF",
    },
    android: {
      flexDirection: "row",
      alignItems: "center",
      height: 85,
      backgroundColor: "#FFFFFF",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.18,
      shadowRadius: 16.0,
      elevation: 21,
    },
  }),

  backButtonContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 18,
  },

  pageNameContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  pageNameText: {
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 22,
    textAlign: "center",
    textAlignVertical: "center",
    color: COLORS.navigationActive,
  },
  logoutButtonContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingRight: 27,
  },
  logoutButtonText: {
    lineHeight: 22,
    fontSize: 18,
    fontWeight: "500",
  },
});
