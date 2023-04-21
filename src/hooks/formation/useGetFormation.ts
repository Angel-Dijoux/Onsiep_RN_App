import { useQuery } from "react-query";
import { BASE_URL } from "../../config";

const useGetFormation = (id: string) => {
  const fetchById = async (id: string) => {
    const response = await fetch(`${BASE_URL}/formations/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  };

  const { isLoading, data } = useQuery(["formation", id], () => fetchById(id));
  return { data, isLoading };
};

export { useGetFormation };
