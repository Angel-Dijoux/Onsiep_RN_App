import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { OnisepContext } from '../../context/OnisepContext';
import Close from './close';

const FilterActive = (props) => {

        const { filterType } = useContext(OnisepContext)

        return (
            <View style={styles.tag}> 
                <Text style={{color: "#F7F7F7", maxWidth:200 }}
                    multiline={false}
                    numberOfLines={1}
                >
                    {filterType[0].libelle_type_formation}
                </Text>
                <Close 
                    func={props.func}
                    padding={14}
                />
            </View>
        )
    }

export default FilterActive

const styles = StyleSheet.create({
    tag: {
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center", 
        backgroundColor: "#1D7C91",
        padding: 8,
        borderRadius: 25,
        marginRight: 5,
    }, 
    image: {
        width: 20,
        height: 20,
        alignSelf: 'center',
        tintColor: "#F7F7F7"
    }
})