import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';



const TopFormation = (props) => {

    //Find screen size
    let width = Dimensions.get('window').width
    let height = Dimensions.get('window').height
    
    //set narin width and height for screen > 500
    const size_block = () => {
        if (width > 500){
            return {'margin':20, 'width':85, 'height':80, 'screen_width': width}
        }
        else{
            return {'margin':15, 'width':75, 'height':70, 'screen_width': width}
        }
    }

    const cardFormation = (
        <TouchableOpacity
            style={{...styles.touchableOpacity, margin: size_block().margin}}
            onPress={props.func}
        >
            <View style={{alignItems: 'center', justifyContent:'center'}}>
                <Image 
                    source={props.icon}
                    style={{
                        width: 75, height: 75,
                        tintColor: "#030402"                   
                    }}
                />
                <Text style={{color: "#030402", marginTop: 5}}>{props.formation}</Text>
            </View>
        </TouchableOpacity>
    )
    return cardFormation
}

export default TopFormation

const styles = StyleSheet.create({
    touchableOpacity: {
        padding: 25, 
        backgroundColor:"#C52E25",
        width:"40%", 
        alignItems: 'center', 
        justifyContent:'center' , 
        borderRadius: 8
    },  
})