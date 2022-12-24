import { View, Image, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'

const Header = (props: any) => {
    return (
        <SafeAreaView style={{ flex: 1 }} >
            <TouchableOpacity
                onPress={props.nav}
                style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginLeft: "6%",
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
            <View style={{
                borderBottomColor: '#000000',
                borderBottomWidth: 0.3,
            }}  ></View>
        </SafeAreaView>

    )
}

export default Header