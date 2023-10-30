
import { useQuery } from "react-query";
import { type Formations } from "../../../shared/formation/fomationv2.type";
import { fetchWithoutToken } from "../../../utils/fetchWithToken";


export const useSearchFormations = (query: string) => {
  const fetchSearchResult = async () => {
    const response = await fetchWithoutToken("/formations/search", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "limit": 10,
        "query": query
      })
    })
    if (!response.ok) {
      throw new Error("Error on search formations");
    }
    return response.json();
  }

  const {
    isLoading,
    error,
    data,
    refetch
  } = useQuery<Formations>("searchFormations", fetchSearchResult, { retry: 2 })

  return { isLoading, data, refetch };
};
