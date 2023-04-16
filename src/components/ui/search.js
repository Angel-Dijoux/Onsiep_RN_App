import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

const SearchBar = (props) => {
  const search = (
    <View>
      <Text style={styles.text}>{props.name}</Text>
      <View
        style={{
          ...styles.inputContainer,
          marginTop: 5,
          marginBottom: props.mb,
          backgroundColor: props.bg ? "#C52E25" : "#FFD40D",
        }}
      >
        <Image
          source={props.icon}
          resizeMode="contain"
          style={{
            ...styles.inputIcon,
            tintColor: props.color ? "#F7F7F7" : "#030402",
          }}
        />
        <TextInput
          style={{
            ...styles.input,
            color: props.color ? "#F7F7F7" : "#030402",
          }}
          editable={props.loading}
          secureTextEntry={props.password}
          keyboardType={props.type}
          placeholder={props.name}
          placeholderTextColor={props.color ? "#F7F7F7" : "#030402"}
          value={props.search}
          onChangeText={props.func}
          onSubmitEditing={props.subfunc}
        />
      </View>
    </View>
  );

  const search_with_props = (
    <View
      style={{
        marginLeft: 17,
        marginRight: 17,
        marginTop: `${props.search == "" ? "2%" : "10%"}`,
      }}
    >
      <View style={{ ...styles.inputContainer, width: "97%", marginLeft: 7 }}>
        <TouchableOpacity onPress={props.funcTouchableOpacity}>
          <Image
            source={
              props.iscliked ? require("../../icons/back.png") : props.icon
            }
            resizeMode="contain"
            style={styles.inputIcon}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          editable={props.loading}
          placeholder={props.name}
          placeholderTextColor="#030402"
          value={props.search}
          onChangeText={props.func}
        />
        <TouchableOpacity onPress={props.funcSettings}>
          <Image
            source={require("../../icons/more_settings.png")}
            resizeMode="contain"
            style={{
              width: 20,
              height: 20,
              alignSelf: "center",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
  if (props.isHome) {
    return search_with_props;
  } else {
    return search;
  }
};

export default SearchBar;

const styles = StyleSheet.create({
  text: {
    marginLeft: 12,
    fontSize: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: "2.5%",
    backgroundColor: "#FFD40D",
    width: "100%",
    borderRadius: 25,
    marginTop: 5,
    marginBottom: 5,
  },
  inputIcon: {
    width: 15,
    height: 15,
    padding: 12,
    marginLeft: 10,
    alignSelf: "center",
  },
  input: {
    marginLeft: 10,
    width: "80%",
    alignSelf: "center",
  },
});
