import { fetchWithToken } from "../../../utils/fetchWithToken";
import { useAuthenticatedQuery } from "../useAuthenticatedQuery";

export interface GetIsFavProps {
  favori_ids: {
    id: number;
    url: string;
  }[];
}

export const useGetIfIsFav = () => {
  const fetchIfFormationIsFav = async () => {
    const response = await fetchWithToken("/favoris/favori_ids", {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Error on fetchIfFormationIsFav");
    }
    return response.json();
  };

  const getIsFav = useAuthenticatedQuery<GetIsFavProps>(
    "get_formation_is_fav",
    fetchIfFormationIsFav,
    { retry: 2 }
  );

  return { getIsFav };
};
