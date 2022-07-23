import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { OnisepContext } from '../../context/OnisepContext';
import PopularsForm from './populars_form';
import NoResult from './no_result';
import GetContentAPI from '../api/get_content_api';    

//return populars formation or home page
const ResultPage = () => {


    const {returnGoodData, isloading, search, searchFilter, setFilterType} = useContext(OnisepContext)

    
    if (isloading) {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size="small" color="#000000"/>
            </View>
        )
    } else {
        if (search == '') {
            return <PopularsForm
                    form1={() => {
                        searchFilter('Langue')
                        setFilterType(null)
                    }}
                    form2={() => {
                        searchFilter('Informatique')
                        setFilterType(null)
                    }}
                    form3={() => {
                        searchFilter('Droit')
                        setFilterType(null)
                    }}
                    form4={() => {
                        searchFilter('Ingénieur')
                        setFilterType(null)
                    }}
                    form5={() => {
                        searchFilter('Santé')
                        setFilterType(null)
                    }}
                    form6={() => {
                        searchFilter('Arts')
                        setFilterType(null)
                    }}
                />
        } if (returnGoodData().length === 0) {
            return (
                <NoResult
                    text={"Auncun résultats"}
                    icon={require("../../icons/noresult.png")}
                />
            )
        } else {
            return (
                <GetContentAPI 
                    data={returnGoodData()}
                    icon={require("../../icons/star.png")}
                    width={"90%"}
                    marginTop={"4%"}
                    marginBottom={"2%"}
                />
            )
        }
    }
}

export default ResultPage