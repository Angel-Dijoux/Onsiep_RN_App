import { Image, TouchableOpacity, StyleSheet } from "react-native"


const Close = (props) => {
    const close = (
        <TouchableOpacity
        onPress={props.func}
    >
        <Image 
            source={require("../../icons/close.png")}
            resizeMode="contain"
            style={{
                width: 20,
                height: 20,
                padding: props.padding,
                alignSelf: 'center',
                marginLeft: 12, 
                tintColor: "#F7F7F7"
            }}
        />
    </TouchableOpacity>
    )
    return close
}

export default Close

const styles = StyleSheet.create({
    
})