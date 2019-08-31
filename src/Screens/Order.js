import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView,Image,TouchableOpacity,Modal } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import LinearGradient from 'react-native-linear-gradient'
import { FlatList } from 'react-native-gesture-handler';
import UserItem from '../Component/UserItem';
import OrderModal from './../Component/OrderModal';
import SearchModal from './../Component/SearchModal';
import OrderItem from './../Component/OrderItem';
import DateTimePicker from "react-native-modal-datetime-picker";



export default class Order extends Component {
    static navigationOptions = {
        title: 'Order',
        tabBarIcon : ({tintColor}) => {
            return <Icon name='calendar-alt' size={20} color={tintColor} />
        }
    };

   

    state = {
        listDataAll : [
            {key : 1, image : 'https://avatarfiles.alphacoders.com/165/thumb-165945.jpg' , nameUser:'Thanh Duy' , email :'thanhduy@gmail.com' , time : '9:30 AM \n 24-7-2019' , coupons : 30,price : 200},
            {key : 2, image : 'https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-9/67560540_706872929750491_5200925105890263040_n.jpg?_nc_cat=101&_nc_oc=AQnMH8xEBScV4tfGjyPN2o0Oi4FhO9BzImOJj2eo2bgQb8suvP9YUl9a3WcQwm3I-8k&_nc_ht=scontent.fsgn2-4.fna&oh=74790cd1254e08b4ba48215b4bc32841&oe=5DCC047E' , nameUser:'Minh Ân' , email :'minhan@gmail.com' , time : '9:30 AM \n 31-8-2019', coupons : 30,price : 200},
            {key : 3, image : 'https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.0-9/67726135_478873296282547_4129598307641065472_n.jpg?_nc_cat=111&_nc_oc=AQlia46Z_ptfGG98xRLF0QPCo9mruhYOuUQMSdBR7_KDs7qCnyiUoqifF2ii2FJeDVc&_nc_ht=scontent.fsgn2-1.fna&oh=5b3097be51a96294cc465a4d50fa288b&oe=5DFFC367' , nameUser:'Văn Dũng' , email :'vandung@gmail.com' , time : '9:30 AM \n 31-8-2019', coupons : 30,price : 200},
            {key : 4, image : 'https://img.fireden.net/vg/image/1540/68/1540682339111.png' , nameUser:'Tiến Đạt' , email :'dat09@gmail.com' , time : '9:30 AM \n 1-9-2019', coupons : 30,price : 200},
            {key : 5, image : 'https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/Evelynn_6.jpg' , nameUser:'Peter Parker' , email :'peter@gmail.com' , time : '9:30 AM \n 2-9-2019', coupons : 30,price : 200},
            {key : 6, image : 'https://66.media.tumblr.com/e8e5a74c872e6c60a3772aee65519bbe/tumblr_phmz92blwo1tlzy6wo4_250.png' , nameUser:'Adam' , email :'adam@gmail.com' , time : '9:30 AM \n 3-9-2019', coupons : 30,price : 200},
            {key : 7, image : 'https://66.media.tumblr.com/839e5f20d65e11bb65e77ba727f6c63d/tumblr_o3qvexoVen1tvo2c3o1_540.gif' , nameUser:'Lê Hậu' , email :'lbhj2team@gmail.com' , time : '9:30 AM \n 3-9-2019', coupons : 30,price : 200},
            // {key : 8, image : 'https://www.mobafire.com/images/avatars/annie-red-riding.png' , nameUser:'Minh Thành' , email :'minhthanh@gmail.com' , time : '9:30 AM \n 24-7-2019'},
            // {key : 9, image : 'https://avatar.leagueoflegends.com/na/Beserkerzlol.png' , nameUser:'Trần Dần' , email :'trandan@gmail.com' , time : '9:30 AM \n 24-7-2019'},
            // {key : 10, image : 'https://am-a.akamaihd.net/image?f=https://news-a.akamaihd.net/public/images/articles/2019/january/bm2019/icon-bm-sivir.jpg' , nameUser:'Văn Tài' , email :'vanTai@gmail.com' , time : '9:30 AM \n 24-7-2019', coupons : 30,price : 200},
            // {key : 11, image : 'https://pbs.twimg.com/profile_images/1147294044411895809/FScwVrLu_400x400.jpg' , nameUser:'Eva' , email :'eva@gmail.com' , time : '9:30 AM \n 24-7-2019', coupons : 30,price : 200},
            // {key : 12, image : 'https://avatar.leagueoflegends.com/na/LoL%20Ergo%20Urgot.png' , nameUser:'Subee' , email :'subee@gmail.com' , time : '9:30 AM \n 24-7-2019', coupons : 30,price : 200}
        ] ,
        listData : [],
        modalVisible : false,
        isDateTimePickerVisible: false
    }

    componentDidMount = () => {
        this.setState({
            listData : this.state.listDataAll,
        })
    }

    _refreshListData = () => {
        this.setState({
            listData : this.state.listDataAll,
        })
    }
  

    _onPressAdd = (item) => {
        this.refs.OrderModal.setImage(item);
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
     
    handleDatePicked = date => {
        let d = new Date(date);
        let dateS = d.getDate()+ '-' + (d.getMonth()+1) + '-'  + d.getFullYear();
        
        console.log("A date has been picked: ",  dateS);
        let listData = this.state.listDataAll.filter((value,key) => {
            return value.time.indexOf(dateS) !== -1;
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
                            listDataAll = {this.state.listDataAll} 
                        >

                        </SearchModal>
                        <OrderModal
                            ref={'OrderModal'}
                            >

                         </OrderModal>
                         <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this.handleDatePicked}
                            onCancel={this.hideDateTimePicker}
                            />
          
            <ScrollView style={styles.container}>
                
                <View style={styles.container_inner}>
                    <View style={styles.headers}>
                        <Text style={{position :'absolute', bottom :0 , left : "5%", fontSize : 24 , color : '#340021'}}>Order</Text>
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
                                    Hi Admin
                                </Text>
                                <Text style={{fontSize : 16, color : '#F4EFF2'}}>12 New Order</Text>
                        </View>
                        <Image
                            source={{ uri: 'https://avatarfiles.alphacoders.com/952/95227.jpg' }}
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
