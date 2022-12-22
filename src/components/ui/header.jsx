import { Image, Text, TouchableOpacity } from 'react-native'

const Header = (props) => {
    return (
        <TouchableOpacity
            onPress={props.nav}
            style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                marginLeft: "6%",
                marginTop: "9%",
                marginBottom: "2%",
            }}
        >
            <Image
                source={require("../../icons/back.png")}
                resizeMode="contain"
                style={{ width: 30, height: 30 }}
            />
            <Text style={{ marginLeft: 15, marginBottom: 1, fontSize: 20, fontWeight: "900" }}>
                {props.name}
            </Text>
        </TouchableOpacity>
    )
}

export default Header