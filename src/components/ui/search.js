import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';


const SearchBar = (props) => {
    const search = (
        <View>
            <Text style={styles.text}>{props.name}</Text>
            <View style={styles.inputContainer}>
                <Image 
                    source={props.icon}
                    resizeMode="contain"
                    style={styles.inputIcon}
                />
                <TextInput 
                    style={styles.input}
                    editable={props.loading}
                    placeholder = {props.name}
                    placeholderTextColor={'#030402'}
                    value={props.search}
                    onChangeText={props.func}
            /> 
            </View>
        </View>
    )   

    const search_with_props = (
        <View style={{marginLeft: 17, marginRight: 17, marginTop: `${props.search == '' ? "5%" : "10%"}` }}>
            <View style={{ ...styles.inputContainer, width: "97%", marginLeft: 7}}>
                <TouchableOpacity
                    onPress={props.funcTouchableOpacity}
                >
                    <Image 
                        source={props.iscliked ? require("../../icons/back.png") : props.icon}
                        resizeMode="contain"
                        style={styles.inputIcon}
                    />
                </TouchableOpacity>
                <TextInput 
                    style={styles.input}
                    editable={props.loading}
                    placeholder = {props.name}
                    placeholderTextColor={'#030402'}
                    value={props.search}
                    onChangeText={props.func}
            /> 
            </View>
        </View>
    )
    if(props.isHome){
        return search_with_props
    } else { 
        return search
    }
}

export default SearchBar

const styles = StyleSheet.create({
    text: {
        marginLeft: 8
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center", 
        padding: "2.5%", 
        backgroundColor:"#FFD40D", 
        width: "100%", 
        borderRadius: 25, 
        marginTop: 7, 
        marginBottom: 7,
        
        
    },
    inputIcon: {
        width: 20,
        height: 20,
        padding: 14,
        marginLeft: 8,
        alignSelf: 'center'
    },
    input: {
        marginLeft: 10,
        width:"100%"
    },

})