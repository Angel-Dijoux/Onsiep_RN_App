import { useQuery } from "react-query";

import { ONISEP_API_URL } from "./useGetOnisepFormations";
import { OnisepFormations } from "../../../shared/formation/onisepFormation.type";
import GET_TOKEN from "../../components/api/get_token";
import { Config } from "../../config";
import { useAuthenticatedQuery } from "../useAuthenticatedQuery";
import { fetchWithToken } from "../../../utils/fetchWithToken";

type Formation = {
  domain: string;
  libelle: string
  niveau_de_sortie: string
  type: string
  url: string
}

type Formations = {
  formations: [Formation]
  total: number
}

export const useSearchFormations = (query: string) => {
  const fetchSearchedFormationFromOnisep = async (q: string) => {
    const TOKEN_API = await GET_TOKEN();
    const response = await fetch(`${ONISEP_API_URL}q=${q}&size=20`, {
      headers: {
        "Application-ID": Config.onisepAppId,
        Authorization: "Bearer " + TOKEN_API,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data from onisep");
    }
    return response.json();
  };

  const getSearchedFormations = useQuery<OnisepFormations, Error>(
    ["searched_onisep_formations", query],
    () => fetchSearchedFormationFromOnisep(query)
  );

  const fetchSearchResult = async () => {
    const response = await fetchWithToken("/formations/search", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "limit": 10,
        "query": "sio"
      })
    })
    if (!response.ok) {
      throw new Error("Error on add in favorite");
    }
    return response.json();
  }

  const {
    isLoading,
    error,
    data: formations,
  } = useAuthenticatedQuery<Formations>("searchFormations", fetchSearchResult, { retry: 2 })

  return { getSearchedFormations, isLoading, formations };
};
