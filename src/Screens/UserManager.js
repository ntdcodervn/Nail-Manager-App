import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView,Image,TouchableOpacity,Modal } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient'
import { FlatList } from 'react-native-gesture-handler';
import UserItem from '../Component/UserItem';
import AddModal from './../Component/AddModal';
import SearchModal from './../Component/SearchModal'
import Foundation from 'react-native-vector-icons/Foundation'
import axios from 'axios';
import BASE_URL from './../Util/global'
import StoreData from '@react-native-community/async-storage'




export default class UserManager extends Component {
    static navigationOptions = {
        title: 'Home',
        tabBarIcon : ({tintColor}) => {
            return <Icon name='home' size={20} color={tintColor} />
        }
    };

    state = {
        listDataAll : [
            
        ] ,
        listData : [],
        modalVisible : false,
        dataAdmin : {
            name : '',
            avatar : ''
        },
        page : 1
    }

    componentDidMount = async () => {
        this._refreshListData(0);
    }
    handelLoadMore = async ()  => {
        
        let token = await StoreData.getItem('token');
        const listDataUser = await axios.get(`${BASE_URL}api/users//getAllUser?page=${this.state.page}`,{
            headers : {
                'x-auth-token' : token
            }
            });
            console.log(this.state.page);
           if(listDataUser.data.listUser.length !== 0)
           {    
                await this.setState({
                    page : this.state.page + 1
                })
                await this.setState({
                    listDataAll :this.state.listDataAll.concat(listDataUser.data.listUser),
                })
                await this.setState({
                    listData : this.state.listDataAll,
                })
            }
        
    }
  

    _onPressAdd = (item) => {
        this.refs.addModal.setImage(item);
        this.refs.addModal.showAddModal();
    }

    _onPressSearchModal = () => {
        this.refs.searchModal.onShowSearchModal();
    }

    fillOnFlatList = (data) => {
        this.setState({
            listData : data
        })
    }

    _refreshListData = async (page) => {
        let token = await StoreData.getItem('token');
        

        const getDataAdmin = await axios.get(`${BASE_URL}api/users//getDataUser`,{
            headers : {
                'x-auth-token' : token
            }
        });
        
        if(getDataAdmin.data.role === 'admin')
        {
            const listDataUser = await axios.get(`${BASE_URL}api/users//getAllUser?page=${page}`,{
            headers : {
                'x-auth-token' : token
            }
            });
            await this.setState({
                listDataAll :listDataUser.data.listUser,
                dataAdmin : getDataAdmin.data,
                page : 1
            })
            await this.setState({
                listData : this.state.listDataAll,
            })
        }
        else {
            this.props.navigation.navigate("LogInScreen");
        }
        
    }

    render() {
        return (
            <View style={{width : '100%', height : '100%'}}>
                        <SearchModal
                            ref={'searchModal'}
                            fillOnFlatList = {this.fillOnFlatList}  
                            listDataAll = {this.state.listDataAll} 
                        >

                        </SearchModal>
                        <AddModal
                            ref={'addModal'}
                            >

                         </AddModal>
          
            <ScrollView style={styles.container}
               
                onMomentumScrollEnd={(e) => {
                    const scrollPosition = e.nativeEvent.contentOffset.y;
                    const scrollViewHeight = e.nativeEvent.layoutMeasurement.height;
                    const contentHeight = e.nativeEvent.contentSize.height;
                    const isScrollToBottom = contentHeight - scrollPosition;
                    console.log(isScrollToBottom + ":" + contentHeight)
                    if(isScrollToBottom >= (contentHeight - 250))
                    {
                        console.log('hello')
                        this.handelLoadMore();
                    }
                }}
            >
                
                <View style={styles.container_inner}>
                    <View style={styles.headers}>
                        <Text style={{position :'absolute', bottom :0 , left : "5%", fontSize : 24 , color : '#340021'}}>User</Text>
                        <TouchableOpacity 
                            style={{position :'absolute', bottom :0 , right : "5%"}}
                            onPress={() => {this._onPressSearchModal()}}
                        >
                            <Icon style={{ fontSize : 20 , color : '#340021'}} name='search' size={30} ></Icon>
                        </TouchableOpacity>
                       
                    </View>
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.profile_user} colors={['#FF00A9' ,'#FF3D81']}>
                        <View style={styles.profile_user_left}>
                                <Text 
                                    style={{fontSize : 20, color : '#F4EFF2' , marginBottom : 9}}>
                                    Hi {this.state.dataAdmin.name}
                                </Text>
                                <Text style={{fontSize : 16, color : '#F4EFF2'}}>{this.state.listData.length} user</Text>
                        </View>
                        <Image
                            source={{ uri: BASE_URL + this.state.dataAdmin.avatar }}
                            style={styles.avatar}
                        ></Image>
                    </LinearGradient>

                    <View style={styles.user_manager}>
                        <Text style={{ fontSize : 16 , color : '#340021'}}>User Manager</Text>
                        <TouchableOpacity 
                            style={styles.refreshButton}
                            onPress={() => {this._refreshListData(0)}}
                        >
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.boxRefreshButton} colors={['#FF00A9' ,'#FF3D81']}>
                                <Foundation name='refresh' style={{marginRight : 5, fontSize : 15}} color={'#FFFFFF'} ></Foundation>
                                <Text style={{ fontSize : 13 , color : '#FFFFFF'}}>Refresh</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                    
                        data={
                                this.state.listData
                            }
                        renderItem = {({item}) => 
                            <TouchableOpacity onPress={() => {this._onPressAdd(item)}}>
                                <View style={{marginBottom : 18}}>
                                    <UserItem 
                                    item = {item}
                                    />
                                </View>
                            </TouchableOpacity>
                            }
                        style={styles.flat_list}
                    >


                    </FlatList>
                        

                </View>

                
            </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        width : "100%",
        height : "100%",
       
    },
    container_inner : {
        width : "100%",
        height : "100%",
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center'
        
        
    },
    headers : {
        width : "100%",
        height : 100,
        position : 'relative'
    },
    profile_user : {
        marginTop : 20,
        width : "90%",
        height : 83,
        backgroundColor : 'red',
        borderRadius : 25,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
       
    },
    avatar : {
        borderRadius : 24,
        width: 48, 
        height: 48,
        marginRight : 34,
       
    },
    profile_user_left : {
        marginLeft : 34
    },
    user_manager : {
        flexDirection : 'row',
        width : "90%",
        justifyContent : 'flex-start',
        
        marginTop : 42,
        marginBottom : 18,
        position : 'relative'
    },
    refreshButton : {
        position : "absolute",
        right : 0,
        width : 90,
        height : 30,
        

    },
    boxRefreshButton : {
        width : "100%",
        height : "100%",
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 20,
        flexDirection : 'row'
    },
    flat_list : {
        width : '90%'
    }


})
