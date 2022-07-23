import React, { useState, useContext } from "react";

import { Text, View, TextInput, Button } from 'react-native'
import { AuthContext } from "../src/context/AuthContext";

const LoginScreen = () => {

    const {login} = useContext(AuthContext)
    const [email, setemail] = useState(null)
    const [password, setpassword] = useState(null)


    const login_form = (
        <View style={{flex: 1, justifyContent: 'center', alignItems:"center"}}>
            <TextInput 
                placeholder="username"
                value={email}
                style={{width:"80%", height:"5%",backgroundColor:"green"}}
                onChangeText={text => setemail(text)}
            />
            <TextInput 
                placeholder="password"
                value={password}
                style={{width:"80%", height:"5%",backgroundColor:"green"}}
                onChangeText={text => setpassword(text)}/>
            <Button title="Register" onPress={() => {login(email, password)}} style={{width:"100%"}}/>
        </View>
    )
    return login_form 
}
export default LoginScreen