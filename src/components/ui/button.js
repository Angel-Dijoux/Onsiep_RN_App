import { Text, TouchableOpacity, StyleSheet } from "react-native";

const ProfilEdit = (props) => {
  const button = (
    <TouchableOpacity
      style={{ ...styles.button, width: props.width ? props.width : "40%" }}
      onPress={props.func}
    >
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
  return button;
};

export default ProfilEdit;

const styles = StyleSheet.create({
  button: {
    padding: 9,
    width: "40%",
    backgroundColor: "#C52E25",
    borderRadius: 35,
    elevation: 4,
  },
  text: {
    textAlign: "center",
    color: "#F7F7F7",
    fontSize: 16,
  },
});
