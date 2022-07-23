import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput,  } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import SettingsScreem from "../screens/SettingsScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen"

const Tab  = createBottomTabNavigator();


const AuthTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: '#F2F4FB',
                    height: 50,
                },
                headerShown: false,
            }}
        >
            <Tab.Screen name="Login" component={LoginScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent:'center', top: focused ? 0 : 3 }}>
                        <Image 
                            source={require('../src/icons/star.png')}
                            resizeMode='contain'
                            style = {{
                                width: 25,
                                height: 25,
                                marginBottom: 2,
                                tintColor: focused ? '#C52E25' : '#030402'
                            }}
                        />
                        <Text
                        style={{color: focused ? '#C52E25' : '#030402', fontSize: 10}}>
                            Login</Text>
                    </View>
                ), 
            }}  />
            <Tab.Screen name="register" component={RegisterScreen}/> 
            <Tab.Screen name="Home" component={HomeScreen}  options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent:'center', top: focused ? 0 : 3, }}>
                        <Image 
                            source={require('../src/icons/home.png')}
                            resizeMode='contain'
                            style = {{
                                width: 25,
                                height: 25,
                                marginBottom: 2,
                                tintColor: focused ? '#C52E25' : '#030402'
                            }}
                        />
                        <Text
                        style={{color: focused ? '#C52E25' : '#030402', fontSize: 10}}>
                            Accueil</Text>
                    </View>
                ),
            }} />
            <Tab.Screen name="Settings" component={SettingsScreem}  options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent:'center', top: focused ? 0 : 3 }}>
                        <Image 
                            source={require('../src/icons/settings.png')}
                            resizeMode='contain'
                            style = {{
                                width: 25,
                                height: 25,
                                marginBottom: 2,
                                tintColor: focused ? '#C52E25' : '#030402'
                            }}
                        />
                        <Text
                        style={{color: focused ? '#C52E25' : '#030402', fontSize: 10}}>
                            Paramètres</Text>
                    </View>
                )
            }} />

        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            heigh: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5.5,
        elevation: 5,
    },

})

export default AuthTabs;