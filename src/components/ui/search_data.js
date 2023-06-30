import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";

import { NoResult } from "./no_result";
import PopularsForm from "./populars_form";
import { OnisepContext } from "../../context/OnisepContext";
import { ListFormation } from "../Formation/ListFormation";

// return populars formation or home page
const ResultPage = (nav) => {
  const { returnGoodData, isloading, search, searchFilter, setFilterType } =
    useContext(OnisepContext);

  if (isloading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="small" color="#000000" />
      </View>
    );
  } else {
    if (search == "") {
      return (
        <PopularsForm
          form1={() => {
            searchFilter("Langue");
            setFilterType(null);
          }}
          form2={() => {
            searchFilter("Informatique");
            setFilterType(null);
          }}
          form3={() => {
            searchFilter("Droit");
            setFilterType(null);
          }}
          form4={() => {
            searchFilter("Ingénieur");
            setFilterType(null);
          }}
          form5={() => {
            searchFilter("Santé");
            setFilterType(null);
          }}
          form6={() => {
            searchFilter("Arts");
            setFilterType(null);
          }}
        />
      );
    }
    if (returnGoodData().length === 0) {
      return (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "65%",
          }}
        >
          <NoResult
            text="Aucun résultats"
            icon={require("../../icons/noresult.png")}
          />
        </View>
      );
    } else {
      return <ListFormation data={returnGoodData()} navigation={nav} />;
    }
  }
};

export default ResultPage;
