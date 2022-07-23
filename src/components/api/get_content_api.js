import React, { useContext } from 'react';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, Animated, Dimensions } from 'react-native';
import { AuthContext } from '../../context/AuthContext';

const GetContentAPI = (props) => {

    const { PostFavoris, userToken,  } = useContext(AuthContext)

    const header = () => {
        return (props.header)
    }

    const swip = (progress, dragX) => { 
        const scale = dragX.interpolate({
            inputRange: [0, 150],
            outputRange: [0, 1],
        })
        return (
            <Animated.View style={{ transform: [{rotate: '180deg'}] ,...styles.formation, justifyContent: "center", alignItems:"center"}}> 
                <Animated.Text style={{ transform: [{scale: scale}] }}>Ajouter aux favoris</Animated.Text>
            </Animated.View> 
        )
    }

    const dataView = (
        <FlatList 
        data={props.data}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
            <View style={{justifyContent:"center",marginTop: props.marginTop, marginBottom: props.marginBottom, paddingLeft: 25, paddingRight: 25}}> 
                <GestureHandlerRootView>
                <Swipeable
                    renderRightActions={swip}
                >
                <View style={{ ...styles.formation }}>
                    <View style={styles.headFormation}>
                        <Text style={styles.starFormation} >{item.sigle_type_formation || "non renseigné"}</Text>
                        <TouchableOpacity
                            onPress={() => {
                                PostFavoris(
                                    item.code_nsf,
                                    item.sigle_type_formation,
                                    item.libelle_type_formation,
                                    item.libelle_formation_principal,
                                    item.sigle_formation,
                                    item.duree,
                                    item.niveau_de_sortie_indicatif,
                                    item.code_rncp,
                                    item.niveau_de_certification,
                                    item.libelle_niveau_de_certification,
                                    item.tutelle, 
                                    item.url_et_id_onisep, 
                                )
                            }}
                        > 
                            <Image 
                                source={props.icon}
                                resizeMode='contain'
                                style = {{
                                    width: 20,
                                    height: 20,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={{marginBottom:12, fontWeight: "300", fontStyle: "italic", fontSize: 14  }}>{item.duree}</Text>
                    <Text style={{marginBottom: 10, fontSize: 17}}>{item.libelle_type_formation}</Text>
                    <Text style={{marginBottom: 10, fontSize: 17}}>{item.libelle_formation_principal}</Text>
                    
                </View>
                </Swipeable>
                </GestureHandlerRootView>
            </View>
        )}
        initialNumToRender={18}
        ListHeaderComponent={header()}
        style={{
            backgroundColor: "#F7F7F7", 
            width: "100%",
            
        }}
    /> )
    return dataView
}

export default GetContentAPI

const styles = StyleSheet.create({
    formation: {
        flexDirection:"column",
        alignItems: "flex-start",
        backgroundColor: "#FFD400",
        padding: 15,
        borderRadius: 8,
    },
    headFormation: { 
        width:"100%", 
        flexDirection: "row", 
        justifyContent:"space-between"
    }, 
    starFormation: {
        fontSize:18, 
        fontWeight: 'bold'
    },
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
        marginBottom: 7
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