import { View, Text, Image, StyleSheet } from "react-native";

const NoResult = (props) => {
  const noresult = (
    <View style={styles.container}>
      <Image source={props.icon} resizeMode="contain" style={styles.image} />
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
  return noresult;
};

export default NoResult;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 90,
    height: 90,
    alignSelf: "center",
  },
  text: {
    fontSize: 19,
    fontWeight: "bold",
  },
});
