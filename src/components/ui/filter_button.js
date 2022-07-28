import { Image, TouchableOpacity, StyleSheet } from "react-native"


const FilterButton = (props) => {
    const button = (
        <TouchableOpacity
            onPress={props.func}
            style={styles.touchableOpacity}
        >
            <Image 
                source={props.icon}
                resizeMode="contain"
                style={styles.image}
            />                   
        </TouchableOpacity>
    )
    return button
}


export default FilterButton 

const styles = StyleSheet.create({
    touchableOpacity: {
        backgroundColor: "#C52E25", 
        padding: 14,
        borderRadius: 25,
        marginLeft: 5,
        marginRight: 12,
    },
    image: {
        width: 20,
        height: 20,
        alignSelf: 'center',
        tintColor: "#F7F7F7"
    }
})