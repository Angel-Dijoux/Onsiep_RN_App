import { useQuery } from "react-query";

import { ONISEP_API_URL } from "./useGetOnisepFormations";
import { OnisepFormations } from "../../../shared/formation/onisepFormation.type";
import GET_TOKEN from "../../components/api/get_token";
import { ONSIEP_APP_ID } from "../../config";

export const useSearchFormations = (query: string) => {
  const fetchSearchedFormationFromOnisep = async (q: string) => {
    const TOKEN_API = await GET_TOKEN();
    const response = await fetch(`${ONISEP_API_URL}q=${q}&size=20`, {
      headers: {
        "Application-ID": ONSIEP_APP_ID,
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

  return { getSearchedFormations }
};
