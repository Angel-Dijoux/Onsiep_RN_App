import { useQuery } from "react-query";

import { type OnisepFormations } from '../../../shared/formation/onisepFormation.type';
import GET_TOKEN from "../../components/api/get_token";
import { ONSIEP_APP_ID } from "../../config";


const ONISEP_API_URL = "https://api.opendata.onisep.fr/api/1.0/dataset/5fa591127f501/search?"

const useGetOnisepFormations = (offset: number) => {
    const fetchFormationFromOnisep = async (size: number) => {
        const TOKEN_API = await GET_TOKEN();
        const response = await fetch(`${ONISEP_API_URL}size=${size}`, {
            headers: {
                "Application-ID": ONSIEP_APP_ID,
                Authorization: "Bearer " + TOKEN_API
            }
        })
        if (!response.ok) {
            throw new Error("Failed to fetch data from onisep");
        }
        return response.json()
    }

    const { isLoading, data } = useQuery<OnisepFormations, Error>(["onisep_formations", offset], () => fetchFormationFromOnisep(offset))
    return { data, isLoading }
}

export { useGetOnisepFormations }