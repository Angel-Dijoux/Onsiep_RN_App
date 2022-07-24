import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNetInfo } from "@react-native-community/netinfo";
import axios from 'axios'
import React, { createContext, useState, useEffect } from 'react'

import { BASE_URL } from '../config'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
 
    const netInfo = useNetInfo()


    const [isloading, setLoading] = useState(false)
    const [userToken, setUserToken] = useState(null)
    const [userTokenRefresh, setUserTokenRefresh] = useState(null)
    const [userInfo, setUserInfo] = useState(null)
    const [favisloading, setFavLoading] = useState(false)
    const [favoris, setfavoris] = useState(null)

    const login = (email, password) => {
        setLoading(true)
        axios.post(`${BASE_URL}/auth/login`, {
            email,
            password
        })
        .then(res =>{
            let userInfo = res.data
            setUserInfo(userInfo)
            setUserToken(userInfo.user.access)
            setUserTokenRefresh(userInfo.user.refresh)

            AsyncStorage.setItem('userToken', userInfo.user.access)
            AsyncStorage.setItem('refreshToken', userInfo.user.refresh)
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo.user) )
        })
        .catch(e =>{
            console.log("Axios request login error : ", e)
        })
        setLoading(false)
    }

    const refresh_token = (TOKEN) => {
        return new Promise((resolve) => {
            setLoading(true)
            const API_LINK = `${BASE_URL}/auth/token/refresh`
    
            fetch(API_LINK, {
                method: 'GET',
                headers: { 
                    'Authorization' : 'Bearer ' + TOKEN //use authentification with token
                },
            }).then(res => { return res.json() })
            .then((data) => {
                resolve(data.access)
            })
            .catch((e) => { 
                console.log("Error in REFRESH_TOKEN Function : ", e)
            })
            setLoading(false)
        })
    }

    const GetFavoris = async() => {    
        setFavLoading(true)
        let NewuserToken = await refresh_token(userTokenRefresh)
        if(NewuserToken == undefined){
            NewuserToken = userToken
        }
        setTimeout(() => {
            axios.get(`${BASE_URL}/favoris/`, {
                headers: { 
                    'Authorization' : 'Bearer ' + NewuserToken || userToken //use authentification with token
                },
            })
            .then(res => {
                let userLink = res.data
                setfavoris(userLink)
                AsyncStorage.setItem('favoris', JSON.stringify(res.data))
                setFavLoading(false)
              
            })
            .catch(e => {
                console.log("Error in Function get_fav : ", e)
            }) 
        }, 150)
    }

    const PostFavoris = async(
        code_nsf,
        sigle_type_formation,
        libelle_type_formation,
        libelle_formation_principal,
        sigle_formation,
        duree,
        niveau_de_sortie_indicatif,
        code_rncp,
        niveau_de_certification,
        libelle_niveau_de_certification,
        tutelle,
        url_et_id_onisep,

    ) => {
        let NewuserToken = await refresh_token(userTokenRefresh)
        if(NewuserToken == undefined){
            NewuserToken = userToken
        }
        const bodyParameters = {
            code_nsf: code_nsf,
            sigle_type_formation: sigle_type_formation, 
            libelle_type_formation: libelle_type_formation, 
            libelle_formation_principal: libelle_formation_principal,
            sigle_formation: sigle_formation,
            duree: duree,
            niveau_de_sortie_indicatif: niveau_de_sortie_indicatif,
            code_rncp: code_rncp,
            niveau_de_certification: niveau_de_certification,
            libelle_niveau_de_certification: libelle_niveau_de_certification, 
            tutelle: tutelle,
            url_et_id_onisep: url_et_id_onisep
        };
        try{
            await fetch(`${BASE_URL}/favoris/`, {
                method: 'POST',
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' +  NewuserToken
                },
                body: JSON.stringify(bodyParameters)
            })
        } catch(e) {
            console.log("Error in PostFavoris : ", e)
        }
    }


    const logout = () => {
        setLoading(true)
        setUserToken(null)
        AsyncStorage.removeItem('userInfo')
        AsyncStorage.removeItem('userToken')
        AsyncStorage.removeItem('refreshToken')
        AsyncStorage.removeItem('favoris')
        setLoading(false)
    }

    const isLoggedIn = async() => {
        try {
            setLoading(true)
            let userInfo = await AsyncStorage.getItem('userInfo')
            let refreshToken = await AsyncStorage.getItem('refreshToken')
            let userToken = await AsyncStorage.getItem('userToken')
            let favoris = await AsyncStorage.getItem('favoris')

            userInfo = JSON.parse(userInfo)

            if (userInfo){
                setUserTokenRefresh(refreshToken)
                setUserInfo(userInfo)
                setUserToken(userToken)
                setfavoris(favoris)
            }
            setLoading(false)
        } catch(e) {
            console.log("isLoggedIn Function Error : ", e)
        }
    }
    useEffect(() => {
        isLoggedIn()
    }, [])
    return(
        <AuthContext.Provider value={{login, logout, GetFavoris,isloading, userToken, userTokenRefresh, userInfo, PostFavoris, favisloading, favoris}}>
            {children}
        </AuthContext.Provider>
    )
}
