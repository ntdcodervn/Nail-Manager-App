import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView,Image,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import LinearGradient from 'react-native-linear-gradient'
import { FlatList } from 'react-native-gesture-handler';
import OrderModal from './../Component/OrderModal';
import SearchModal from './../Component/SearchModal';
import OrderItem from './../Component/OrderItem';
import DateTimePicker from "react-native-modal-datetime-picker";
import axios from 'axios';
import BASE_URL from './../Util/global';
import StoreData from '@react-native-community/async-storage'


export default class Order extends Component {
    static navigationOptions = {
        title: 'New Order',
        tabBarIcon : ({tintColor}) => {
            return <Icon name='calendar-alt' size={20} color={tintColor} />
        }
    };

   

    state = {
        listDataAll : [
            
        ] ,
        listData : [],
        modalVisible : false,
        isDateTimePickerVisible: false,
        dataAdmin : {
            name : '',
            avatar : ''
        },
        page : 1
    }

    componentDidMount = async () => {
        this._refreshListData();
    }
    

    

    _refreshListData = async () => {
        let token = await StoreData.getItem('token');
        
        const getDataAdmin = await axios.get(`${BASE_URL}api/users//getDataUser`,{
            headers : {
                'x-auth-token' : token
            }
        });
        
        if(getDataAdmin.data.role === 'admin'){
            let listOrder = await axios(`${BASE_URL}api/booking/getAllBook?page=0&status=0`,{
                headers :{
                    'x-auth-token' : token
                }
            });
            
            
            await this.setState({
                listDataAll :listOrder.data.listBooking,
                dataAdmin : getDataAdmin.data,
                page : 1
            })
            this.setState({
                listData : this.state.listDataAll,
            })
        }
        else {
            this.props.navigation.navigate("LogInScreen");
        }
        
        console.log(this.state.listDataAll)
    }
  

    _onPressAdd = (item) => {
        let items = {
            ...item.users, 
            total : item.total,
            idBooking : item._id,
            status : item.status
        }
        this.refs.OrderModal.setImage(items);
        this.refs.OrderModal.showOrderModal();
    }

    _onPressSearchModal = () => {
        this.refs.searchModal.onShowSearchModal();
    }

    fillOnFlatList = (data) => {
        this.setState({
            listData : data
        })
    }

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
      };

      handelLoadMore = async ()  => {
        
        let token = await StoreData.getItem('token');
        const listDataUser = await axios.get(`${BASE_URL}api/users//getAllUser?page=${this.state.page}&status=0`,{
            headers : {
                'x-auth-token' : token
            }
            });
            console.log(this.state.page);
           if(listDataUser.data.listBooking.length !== 0)
           {    
                await this.setState({
                    page : this.state.page + 1
                })
                await this.setState({
                    listDataAll :this.state.listDataAll.concat(listDataUser.data.listBooking),
                })
                await this.setState({
                    listData : this.state.listDataAll,
                })
            }
        
    }
     
    handleDatePicked = date => {
        let d = new Date(date);
        let dateS = d.getDate()+ '-' + (d.getMonth()+1) + '-'  + d.getFullYear();
        
        console.log("A date has been picked: ",  dateS);
        let listData = this.state.listDataAll.filter((value,key) => {
            let d = new Date(value.slots.date);
            let dateS2 = d.getDate()+ '-' + (d.getMonth()+1) + '-'  + d.getFullYear();
            console.log(dateS2)
            return dateS2.indexOf(dateS) !== -1;
        })
        this.fillOnFlatList(listData);
        this.hideDateTimePicker();

    };

    render() {
        const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        return (
            <View style={{width : '100%', height : '100%'}}>
                        <SearchModal
                            ref={'searchModal'}
                            fillOnFlatList = {this.fillOnFlatList}  
                            listDataAll = {this.state.listDataAll.map((value) => {return value.users})} 
                        >

                        </SearchModal>
                        <OrderModal
                            ref={'OrderModal'}
                            _refreshListData = { this._refreshListData}
                            >

                         </OrderModal>
                         <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this.handleDatePicked}
                            onCancel={this.hideDateTimePicker}
                            />
          
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
                        <Text style={{position :'absolute', bottom :0 , left : "5%", fontSize : 24 , color : '#340021'}}>New Order</Text>
                        <TouchableOpacity 
                            style={{position :'absolute', bottom :0 , right : "5%"}}
                            // onPress={() => {this._onPressSearchModal()}}
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
                                <Text style={{fontSize : 16, color : '#F4EFF2'}}>{this.state.listData.length} New Order</Text>
                        </View>
                        <Image
                            source={{ uri: BASE_URL + this.state.dataAdmin.avatar }}
                            style={styles.avatar}
                        ></Image>
                    </LinearGradient>

                    <View style={styles.user_manager}>
                        <Text style={{ fontSize : 16 , color : '#340021'}}>Order Manager</Text>
                       <View>
                            <TouchableOpacity
                                onPress={() => {this.setState({isDateTimePickerVisible : true})}}
                                style={styles.choiseDate}
                            >
                                <Icon name = "calendar-alt" style={{marginRight : 5}} fontSize={20} ></Icon>
                                <Text style={{ fontSize : 14 , color : '#340021'}}>Choise date</Text>
                            </TouchableOpacity>

                       </View>

                       <TouchableOpacity
                            onPress={() => {this._refreshListData()}}
                            style={styles.refreshButton}
                        >   
                                <SimpleLineIcons name='refresh' style={{marginRight : 5}} fontSize={20} ></SimpleLineIcons>
                                <Text style={{ fontSize : 14 , color : '#340021'}}>Refresh</Text>
                            </TouchableOpacity>
                    </View>
                    <FlatList
                    
                        data={
                                this.state.listData
                            }
                        renderItem = {({item}) => 
                            <TouchableOpacity onPress={() => {this._onPressAdd(item)}}>
                                <View style={{marginBottom : 18}}>
                                    <OrderItem 
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
        justifyContent : 'space-around',
        alignItems : 'center',
        marginTop : 42,
        marginBottom : 25,
        position : 'relative'
        
    },
    choiseDate : {
        flexDirection : 'row',
        justifyContent : 'center',
    },
    refreshButton : {
        flexDirection : 'row',
        justifyContent : 'center',
   
    },
    flat_list : {
        width : '90%'
    }


})
