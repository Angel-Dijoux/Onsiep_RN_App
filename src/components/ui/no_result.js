import { View, Text, Image, StyleSheet } from "react-native";

const NoResult = (props) => {
  const noresult = (
    <>
      <Image source={props.icon} resizeMode="contain" style={styles.image} />
      <Text style={styles.text}>{props.text}</Text>
    </>
  );
  return noresult;
};

export default NoResult;

const styles = StyleSheet.create({
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
