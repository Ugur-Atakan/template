import {axiosInstance} from '..';
import {UserInterface} from '../../types/user';

const getUserData = async (): Promise<UserInterface> => {
  try {
    const repsonse = await axiosInstance.post('/users/me');
    return repsonse.data.result.user;
  } catch (error: any) {
    throw error;
  }
};

export {getUserData};
