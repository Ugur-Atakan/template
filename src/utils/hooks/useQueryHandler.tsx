import { useAppDispatch } from "../../redux/hooks";
import { setLoading, showModal } from "../../redux/reducers/commonReducer";

type operationType = "Login" | "Register" | "General";

const useQueryHandler = () => {
  const dispatch = useAppDispatch();

  const tryQuery = async <T,>(
    func: (...args: any[]) => Promise<T>,
    operationType: operationType
  ): Promise<T | undefined> => {
    dispatch(setLoading(true));
    try {
      const result = await func();
      dispatch(setLoading(false));
      return result;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message;
      if (error.message === "Network Error") {
        dispatch(
          showModal({
            autohide: true,
            ModalContent: {
              title: "Network Error",
              description: "Please check your internet connection",
              type: "Error",
            },
          })
        );
      } else {
        dispatch(
          showModal({
            ModalContent: {
              title: `${operationType} Error`,
              description: errorMessage,
              type: "Error",
            },
          })
        );
      }

      dispatch(setLoading(false));
    }
  };

  return { tryQuery };
};
export default useQueryHandler;
