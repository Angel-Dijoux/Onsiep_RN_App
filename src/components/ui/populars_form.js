import { View, StyleSheet } from "react-native";

import TopFormation from "./top_formation";

const PopularsForm = (props) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        alignContent: "center",
        marginTop: 5,
      }}
    >
      <View style={styles.doubleCards}>
        <TopFormation
          func={props.form1}
          icon={require("../../icons/langue.png")}
          formation="Langue"
        />
        <TopFormation
          func={props.form2}
          icon={require("../../icons/pc.png")}
          formation="Informatique"
        />
      </View>
      <View style={styles.doubleCards}>
        <TopFormation
          func={props.form3}
          icon={require("../../icons/justice.png")}
          formation="Droit"
        />
        <TopFormation
          func={props.form4}
          icon={require("../../icons/ppl.png")}
          formation="Ingénieur"
        />
      </View>
      <View style={styles.doubleCards}>
        <TopFormation
          func={props.form5}
          icon={require("../../icons/hearth.png")}
          formation="Santé"
        />
        <TopFormation
          func={props.form6}
          icon={require("../../icons/art.png")}
          formation="Arts"
        />
      </View>
    </View>
  );
};

export default PopularsForm;

const styles = StyleSheet.create({
  doubleCards: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
