import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'

const RegisterScreen = () => {

    const [username, setusername] = useState(null)
    const [name, setname] = useState(null)
    const [email, setemail] = useState(null)
    const [password, setpassword] = useState(null)

    const form = (
        <View style={styles.container}>
            <TextInput 
                placeholder="username"
                value={username}
                onChangeText={(text) => setusername(text)}
            />
            <TextInput 
                placeholder="name"
                value={name}
                onChangeText={(text) => setname(text)}
                   
            />
            <TextInput 
                placeholder="email"
                value={email}
                onChangeText={(text) => setemail(text)}

            />
            <TextInput 
                placeholder="password"
                value={password}
                onChangeText={(text) => setpassword(text)}
                secureTextEntry

            />
            <Button title="Register" />
            <View>
                <Text>Vous n'avez pas de compte ?</Text>
                <Button title="s'enregistrer" />    
            </View> 
        </View>
        )
    return form
    
}
export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems:"center"
    }
})