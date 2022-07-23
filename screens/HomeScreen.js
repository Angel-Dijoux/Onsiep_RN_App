import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, BackHandler, SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';


import VirtualizedView from './scrool';
import SearchBar from '../src/components/ui/search';
import FilterButton from '../src/components/ui/filter_button';
import FilterActive from '../src/components/ui/filter_active';
import ModalFilter from '../src/components/ui/modal_filter';
import NbResults from '../src/components/ui/nb_results';
import { OnisepContext } from '../src/context/OnisepContext';

import ResultPage from '../src/components/ui/search_data';
import { AuthContext } from '../src/context/AuthContext';


const HomeScreen = ({navigation}) => {

    const {
        searchFilter, 
        filterFormation ,
        returnGoodData, 
        isloading, 
        cliked, 
        filterData, 
        Filter, 
        filterType, 
        search, 
        setcliked, 
        setSearch, 
        setFilterType, 
        setFilter} = useContext(OnisepContext)

    const { userInfo, userToken } = useContext(AuthContext)

    //setup with useState
    const [visibleModal, setVisibleModal] = useState(false)

    const handleBackButtonClick = () => {
        setSearch('')
        if(Filter){ 
            setFilter(false)
        }
        return true;
      }
      
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
          BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
    }, [])

     //return formation "sigle" for filter & tag
    const returnSigleFormation = () => {
        const data_form = filterData
        const sigle_formation = []
        data_form.forEach(element => {
            if(!sigle_formation.includes(element.libelle_type_formation)){
                sigle_formation.push(element.libelle_type_formation)
            }
        
       });
       let dict_sigle_formation = {}
       const result = []
       sigle_formation.forEach(element => {
            dict_sigle_formation = {"id": element}
            result.push(dict_sigle_formation)
       })
       return result
    }

    //flatlist for modal, return "sigle formation" sorted
    const ModalFlatlist = () => {
        const flatlist = (
            <FlatList 
            data={returnSigleFormation()}
            renderItem={({item}) => 
                <View style={{padding: 10, marginBottom: 3, marginTop: 3, width: "100%", borderBottomWidth: 1, borderBottomColor: "#030402", }}>
                    <TouchableOpacity
                        onPress={() => {
                            filterFormation(item.id)
                            setFilter(true)
                            setVisibleModal(false)
                        }}
                    >
                        <Text
                            value={item.id}
                        >{item.id}</Text>
                    </TouchableOpacity>
                </View>
            }
            style={{
                marginBottom: 10,
                marginTop: 5,
            }}
        />
        )
        return flatlist
    }

    const Modal = () => {
        return (
            <ModalFilter 
                visibleModal={visibleModal}
                setVisibleModal={() => {
                    setVisibleModal(!visibleModal)
                }}
                flatlist={ModalFlatlist()}
            />
        )
    }

    const FilterActiveTags = () => {
        if(Filter && filterType != null) {
            return (
                <FilterActive 
                    func={() => setFilterType(null)}
                />
            )
        }
    }
    
    
    //Filter bar with button filter and numbers of results
    const FilterBar = () => {
        if(search != '') { 
            return( 
                <View style={{flexDirection:"row", justifyContent: "space-between", alignItems: 'center',marginBottom: 5,marginTop:8 ,width: "100%"}}>
                    <View style={{ flexDirection:"row",  justifyContent: "flex-start", marginLeft: 20 }}>
                            <FilterButton 
                                icon={require("../src/icons/sort.png")}
                                func={() => setVisibleModal(true)}
                            />
                            {FilterActiveTags()}
                        </View>
                       <NbResults 
                            data={returnGoodData().length}
                        />
                        {Modal()}
                </View>

            )
        }
    }
    
    const hi_me = () => {
        if(search == ''){
            return(
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between",paddingLeft:"5%", paddingRight: "1%",marginTop: 40,}}>
                <Text style={{ fontWeight:"900", fontSize: 20}}>Hi{userToken ? `, ${userInfo.username}` : " "}</Text>
                <FilterButton 
                    icon={require("../src/icons/star.png")}
                    func={() => { userToken ? navigation.navigate('Fav') : navigation.navigate('Login') }}
                />
                </View>
            )
        }
    }   

    const swip = () => {
        return (
            <View style={{backgroundColor: "green", padding: 15}}>
                <Text>
                    KK
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            
                {hi_me()}
                <SearchBar 
                    name={"Chercher une formation"} 
                    search={search} 
                    icon={require("../src/icons/search.png")}
                    loading={!isloading}
                    func={(text) => searchFilter(text)}
                    funcTouchableOpacity={() => {
                        if(search != ''){
                            setcliked(!cliked)
                            setSearch('')
                            setFilterType(null)
                        }
                    }}
                    isHome={true}
                    iscliked={cliked}
                />
             <VirtualizedView>
                {FilterBar()}
                <View style={{marginBottom: "15%"}}>
                    <ResultPage /> 
                </View> 
             </VirtualizedView>
        </View>
    );
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:"column",
        backgroundColor: "#F7F7F7",
        marginTop: 0, 

    },
})

