import { useState } from "react";

const useConnexion = (email: string, password: string) => {
  const [isLoading, stIsLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState();
  const [token, setToken] = useState<string>();
  const [refreshToken, setRefreshToken] = useState<string>();
};

export { useConnexion };
