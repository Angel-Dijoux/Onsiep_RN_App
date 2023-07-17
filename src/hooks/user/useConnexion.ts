import { useMutation } from "react-query";

import { Config } from "../../config";

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
        throw new Error(data.message);
      }
      return data;
    }
  );

  const register = useMutation(
    async ({
      formData,
    }: {
      formData: {
        email: string;
        password: string;
        name: string;
        username: string;
      };
    }) => {
      const response = await fetch(`${Config.baseUrl}/auth/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data;
    }
  );

  return {
    login: login.mutateAsync,
    register: register.mutateAsync,
  };
};

export { useConnexion };
