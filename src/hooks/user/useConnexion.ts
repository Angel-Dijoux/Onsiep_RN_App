import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FormationTabStackNavigationParamsList } from "navigation/formations/FormationTabStackNavigation.types";
import { useMutation } from "react-query";

import { CurrentUserType } from "$shared/auth/currentUser.types";
import { axiosPublic } from "$utils/axiosPublic";

import { useCurrentUser } from "./useCurrentUser";
import { Toaster } from "../../components/ui/Notification/Toaster";
import { setCurrentUserStorage } from "../../components/utils/currentUserStorage";

export type RegisteredUser = {
  email: string;
  password: string;
  checkPassword: string;
  username: string;
  isPrivacyPolicyAccepted?: boolean;
};

export type LoginPayloadProps = {
  user: {
    access: string;
    email: string;
    id: number;
    refresh: string;
    username: string;
  };
};

export type RegisterPayloadProps = {
  user: {
    access: string;
    email: string;
    id: number;
    refresh: string;
    username: string;
  };
};

const LOGIN_USER = async (user: {
  email: string;
  password: string;
}): Promise<LoginPayloadProps> => {
  const response = await axiosPublic.post("/auth/login", user);
  console.log(response);
  return response.data;
};

const REGISTER_USER = async (
  newUser: RegisteredUser
): Promise<RegisterPayloadProps | undefined> => {
  if (newUser.password !== newUser.checkPassword) {
    Toaster.show({
      props: {
        text: "Les mots de passe doivent être les mêmes",
      },
    });
    return;
  }
  const response = await axiosPublic.post("/auth/register", {
    email: newUser.email,
    username: newUser.username,
    password: newUser.password,
  });
  return response.data;
};

const setupSecureStorage = async (
  user: LoginPayloadProps["user"],
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUserType>>
) => {
  const registeredUser = {
    accessToken: user.access,
    refreshToken: user.refresh,
    id: user.id,
    username: user.username,
  };
  setCurrentUser(registeredUser);
  setCurrentUserStorage(registeredUser);
};

const useConnexion = () => {
  const { setCurrentUser } = useCurrentUser();

  const navigation =
    useNavigation<StackNavigationProp<FormationTabStackNavigationParamsList>>();

  const login = useMutation(LOGIN_USER, {
    onSuccess: (data) => {
      setupSecureStorage(data.user, setCurrentUser);
      navigation.navigate("HomeScreen");
    },
    onError: () => {
      Toaster.show({
        props: {
          text: "Check t'es identifiants !",
        },
      });
    },
  });

  const register = useMutation(REGISTER_USER, {
    onSuccess: async (_, variables) => {
      login.mutateAsync({
        email: variables.email,
        password: variables.password,
      });
    },
    onError: () => {
      Toaster.show({
        props: {
          text: "Quelque chose s'est mal passé.",
        },
      });
    },
  });

  return {
    login: login.mutateAsync,
    loginIsLoading: login.isLoading,
    registerIsLoading: register.isLoading,
    register: register.mutateAsync,
  };
};

export { useConnexion };
