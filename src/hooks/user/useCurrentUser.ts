import { createContext, useContext } from "react";

import { type CurrentUserType } from "../../../shared/auth/currentUser.types";

type CurrentUserContextType = CurrentUserType & {
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUserType>>;
};

export const defaultCurrentUser: CurrentUserType = {
  id: 0,
  username: "",
  accessToken: "",
  refreshToken: "",
};

export const CurrentUserContext = createContext<CurrentUserContextType>({
  ...defaultCurrentUser,
  setCurrentUser: () => null,
});

export const useCurrentUser = () => useContext(CurrentUserContext);
