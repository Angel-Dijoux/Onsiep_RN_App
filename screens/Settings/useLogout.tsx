import RNRestart from "react-native-restart";

import { deleteCurrentUserStorage } from "../../src/components/utils/currentUserStorage";

export const useLogout = () => {
  const handleLogout = async () => {
    await deleteCurrentUserStorage();
    RNRestart.restart();
  };

  return { handleLogout };
};
