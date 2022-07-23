import { View, Text } from 'react-native';

const NbResults = (props) => {
    const result = ( 
        <View style={{ flexDirection:"row", justifyContent: "flex-end", marginRight:20}} >
            <View style={{
                    backgroundColor: "#C52E25", 
                    padding: 12,
                    borderRadius: 25,
                    marginRight: 5, 
                }}>
                <Text style={{
                        minWidth: 5, 
                        minHeight: 20,
                        maxWidth: 35, 
                        color: "#F7F7F7", 
                        alignSelf: 'center'
                    }}>{props.data}</Text>
            </View>
        </View>
    )
    return result
}

export default NbResults