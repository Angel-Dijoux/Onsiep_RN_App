import { View, StyleSheet } from "react-native";

const ItemSeparator = () => {
  return <View style={styles.view}></View>;
};

export default ItemSeparator;

const styles = StyleSheet.create({
  view: {
    height: 0.8,
    width: "92%",
    marginLeft: "3%",
    backgroundColor: "#030402",
    borderRadius: 8,
  },
});
