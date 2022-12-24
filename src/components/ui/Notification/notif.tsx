import React, { useEffect, useRef } from "react";
import { Animated, Image, Text, View } from "react-native";

const Message = (props: any) => {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.delay(2000),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }),
        ]).start(() => {
            props.onHide();
        });
    }, []);

    return (
        <Animated.View
            style={{
                zIndex: 999,
                opacity,
                transform: [
                    {
                        translateY: opacity.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-20, 0],
                        }),
                    },
                ],
                margin: 8,
                marginBottom: 10,
                backgroundColor: "#011000",
                padding: 15,
                borderRadius: 25,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignContent: "center",
                    justifyContent: "flex-start",
                }}
            >
                <Image
                    source={require("../../../icons/notif.png")}
                    resizeMode={"contain"}
                    style={{
                        width: 20,
                        height: 20,
                        alignSelf: "center",
                        marginLeft: 4,
                        tintColor: '#F7F7F7'
                    }}
                />
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: "600",
                        marginLeft: 15,
                        textAlign: "center",
                        color: '#F7F7F7'
                    }}
                >
                    {props.message}
                </Text>
            </View>
        </Animated.View>
    );
};

export default Message;
