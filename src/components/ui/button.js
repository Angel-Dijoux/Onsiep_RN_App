import { Text, TouchableOpacity, StyleSheet } from "react-native"


const ProfilEdit = (props) => {
    const button = ( 
        <TouchableOpacity
            style={[styles.button]}
            onPress={props.func}
        >
            <Text style={styles.text}>
                {props.text}
            </Text>    
        </TouchableOpacity>
        )
    return button
} 

export default ProfilEdit

const styles = StyleSheet.create({
    button: {
        padding: 8,
        width: "30%",
        backgroundColor: "#C52E25", 
        borderRadius: 35,
        elevation: 5
    },
    text: {
        textAlign: "center",
        color: "#F7F7F7"
    }
})