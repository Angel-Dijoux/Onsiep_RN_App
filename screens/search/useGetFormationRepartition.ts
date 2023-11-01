import { useQuery } from "react-query";

import { Config } from "../../src/config";

export type FormationsRepartition = {
  doc_count: number;
  key: string;
};

export const useGetFormationRepartition = (query: string) => {
  const getFormationsRepartitions = async ({
    queryParams,
  }: {
    queryParams: { query: string };
  }) => {
    const response = await fetch(
      `${Config.baseUrl}/formations/formation_by_libelle`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...queryParams,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  };

  const { isLoading, data, refetch } = useQuery<FormationsRepartition[], Error>(
    ["formation"],
    () => getFormationsRepartitions({ queryParams: { query } })
  );

  console.log("====================================");
  if (!isLoading) console.log(data);
  console.log("====================================");

  return { isLoading, data, refetch };
};
