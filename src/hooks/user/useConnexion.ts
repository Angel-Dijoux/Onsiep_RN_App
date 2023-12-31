import { useMutation } from "react-query";

import { Toaster } from "../../components/ui/Notification/Toaster";
import { Config } from "../../config";

export type RegisteredUser = {
  email: string;
  password: string;
  checkPassword: string;
  username: string;
};

const useConnexion = () => {
  const login = useMutation(
    async ({ formData }: { formData: { email: string; password: string } }) => {
      const response = await fetch(`${Config.baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        Toaster.show({
          type: "error",
          props: {
            text: data.message,
          },
        });
        throw new Error(data.message);
      }
      return data;
    }
  );

  const register = useMutation(async (newUser: RegisteredUser) => {
    if (newUser.password !== newUser.checkPassword) {
      Toaster.show({
        props: {
          text: "Les mots de passe doivent être les mêmes",
        },
      });
      return;
    }
    const response = await fetch(`${Config.baseUrl}/auth/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: newUser.email,
        username: newUser.username,
        password: newUser.password,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      Toaster.show({
        type: "error",
        props: {
          text: data.message,
        },
      });
      throw new Error(data.message, data);
    }
    return data;
  });

  return {
    login: login.mutateAsync,
    register: register.mutateAsync,
  };
};

export { useConnexion };
