import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

import GET_TOKEN from "../components/api/get_token";
import { ONSIEP_APP_ID } from "../config";

export const OnisepContext = createContext();

export const OnisepProvider = ({ children }) => {
  const [isloading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [cliked, setcliked] = useState(false);
  const [filterData, setFilterData] = useState();
  const [filterType, setFilterType] = useState([]);
  const [Filter, setFilter] = useState(false);
  const [search, setSearch] = useState("");

  const GetFormation = async () => {
    setLoading(true);
    let TOKEN_API = await GET_TOKEN();
    console.log(TOKEN_API);
    axios
      .get(
        " https://api.opendata.onisep.fr/api/1.0/dataset/5fa591127f501/search?size=25",
        {
          headers: {
            "Application-ID": ONSIEP_APP_ID, // app ID in ONISEP
            Authorization: "Bearer " + TOKEN_API, // use authentification with token
          },
        }
      )
      .then((res) => {
        let data = res.data;
        setData(data);
        console.log(data);
        setLoading(false);
      })
      .catch((e) => {
        console.log("Axio error in onisep API : ", e);
      });
  };

  useEffect(() => {
    GetFormation();
  }, []);

  const searchFilter = (text) => {
    if (isloading) {
      setSearch(text);
    } else {
      console.log(text);
      if (text) {
        setcliked(true);
        const all_result = data.results;
        const newData = all_result.filter((item) => {
          const itemData = item.libelle_formation_principal
            ? item.libelle_formation_principal.toUpperCase()
            : "".toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setFilterData(newData);
        setSearch(text);
      } else {
        setcliked(false);
        setSearch(text);
      }
    }
  };

  const filterFormation = (value) => {
    if (value) {
      const newData = filterData.filter((item) => {
        const itemData = item.libelle_type_formation
          ? item.libelle_type_formation.toUpperCase()
          : "".toUpperCase();
        const valueData = value.toUpperCase();
        return itemData.indexOf(valueData) > -1;
      });
      setFilterType(newData);
    } else {
      setFilterType(filterData);
    }
  };

  // return all data or filter data
  const returnGoodData = () => {
    if (Filter && filterType != null) {
      return filterType;
    } else {
      return filterData;
    }
  };

  return (
    <OnisepContext.Provider
      value={{
        data,
        searchFilter,
        filterFormation,
        returnGoodData,
        isloading,
        cliked,
        filterData,
        Filter,
        filterType,
        search,
        setcliked,
        setSearch,
        setFilterData,
        setFilterType,
        setFilter,
      }}
    >
      {children}
    </OnisepContext.Provider>
  );
};
