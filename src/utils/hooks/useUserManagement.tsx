import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserData } from "../../http/requests";
import { useAppDispatch } from "../../redux/hooks";
import { logOut, updateUser } from "../../redux/reducers/userReducer";
import useQueryHandler from "./useQueryHandler";

const useUserManagement = () => {
  const dispatch = useAppDispatch();
  const { tryQuery } = useQueryHandler();

  const updateUserData = async () => {
    const userResponse = await tryQuery(getUserData, "General");
    if (userResponse) {
      dispatch(updateUser(userResponse));
    }
  };

  const logOutUser = () => {
    dispatch(logOut());
    AsyncStorage.removeItem("userTokens");
  };
  return { updateUserData, logOutUser };
};
export default useUserManagement;
