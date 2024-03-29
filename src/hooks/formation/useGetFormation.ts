import { useQuery } from "react-query";

import { type FormationType } from "../../../shared/formation/formation.type";
import { Config } from "../../config";

const useGetFormation = (id: string) => {
  const fetchById = async (id: string) => {
    const response = await fetch(`${Config.baseUrl}/formations/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  };

  const { isLoading, data } = useQuery<FormationType, Error>(
    ["formation", id],
    () => fetchById(id)
  );
  return { data, isLoading };
};

export { useGetFormation };
