import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNetInfo } from "@react-native-community/netinfo";
import axios from 'axios'
import React, { useContext, useState } from 'react';
import { BASE_URL } from '../../config';
import { AuthContext } from '../../context/AuthContext';


const get_fav = () => {

    const { userToken } = useContext(AuthContext)


    axios.get(`${BASE_URL}/favoris/`, {
        headers: { 
            'Authorization' : 'Bearer ' +  userToken //use authentification with token
        },
    })
    .then(res => {
        let userLink = res.data
        console.log("A")
    })
    .catch(e => {
        console.log("Error in Function get_fav : ", e)
    }) 
}


export default get_fav
