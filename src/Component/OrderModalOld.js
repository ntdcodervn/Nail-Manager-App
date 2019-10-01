import React, { Component } from 'react';
import { Text,Alert, StyleSheet, View,Dimensions, Image,Button , TouchableOpacity} from 'react-native';
import Modal from 'react-native-modalbox';
import LinearGradient from 'react-native-linear-gradient'
import BASE_URL from './../Util/global';
import axios from 'axios';
import DataStore from '@react-native-community/async-storage';

var screen = Dimensions.get('window');

export default class OrderModal extends Component {

    showOrderModalOld = () => {
        this.refs.myModal.open();
    }

    setImage = (item) => {
        console.log(item);
        this.setState({
            item : item
        })

    }
    componentDidMount = () => {

    }

    
    
    handelActionStatusOrder = async (status) => {
        const token = await DataStore.getItem('token');
        const changeStatusPay = await axios.post(`${BASE_URL}api/admin/changeStatusBooking`,{
            idBooking : this.state.item.idBooking,
            status : status
        },{
            headers : {
                'x-auth-token' : token
            },
            
        })
        console.log(changeStatusPay);
        this.props._refreshListData();
    }

    closeModal = () => {
       
        this.refs.myModal.close();
        
    }

    state = {
        item : {
            image : ''
        }
    }
    componentWillMount() {
        
    }
    setStatusReturnString = () => {
        console.log(this.state.item.status)
        if(this.state.item.status == -1) {
            return 'Cancelled'
        }
        else if(this.state.item.status == 1)
        {
            return 'Paid'
        }
    }

    render() {
        return (
            <Modal
                ref={'myModal'}
                style={styles.container}
                position = 'center'
                coverScreen = {true}
                backdrop = {true}
                
            >
                <View style={styles.leftArticle}>
                    <Text style={text_style(24,'#340021',0,12)}>Order Details</Text>
                    <Text style={text_style(14,'#340021',0,12)}>Name : {this.state.item.name}</Text>
                    <Text style={text_style(14,'#340021',0,12)}>Email : {this.state.item.email}</Text>
                    <Text style={text_style(14,'#340021',0,12)}>Coupons : {this.state.item.coupons}%</Text>
                    <Text style={text_style(14,'#340021',0,12)}>Price : {this.state.item.total}$ / discount {this.state.item.coupons}% </Text>
                    
                </View>
                <View
                    style={styles.rightArticle}
                >
                        <Image
                            source={{ uri: BASE_URL + this.state.item.avatar }}
                            style={styles.avatar}
                        ></Image>
                        <View style={styles.buttonContainerClose}>
                            <TouchableOpacity
                                style = {styles.closeButton}
                                onPress={() => {this.closeModal()}}
                            >
                                     <LinearGradient 
                                        start={{x: 0, y: 0}} 
                                        end={{x: 1, y: 1}} 
                                        style={{width : "100%", height : "100%", justifyContent : 'center',
                                            alignItems : "center", borderRadius : 20}}
                                        colors={['#FF00A9' ,'#FF3D81']}
                                    >
                                
                                    <Text style={text_style(15,'#FFFFFF')}>Close</Text>
                                    </LinearGradient>
                            </TouchableOpacity>

                            
                            </View>

                </View>
            </Modal>
        )
    }
}

const text_style = (fontSize,color, marginRight, marginBottom ,fontFamily ) => {
    return {
        fontSize : fontSize,
        color : color,
        marginRight : marginRight,
        marginBottom : marginBottom
       
    }
}

const styles = StyleSheet.create({
    container :{
        justifyContent : 'space-around',
        borderRadius : 10,
        width : screen.width - 40,
        height : 270,
        flexDirection : 'row',
        alignItems : 'flex-start',
        paddingTop : 13,
        shadowRadius : 10,
    },
    avatar : {
        width : 64,
        height : 64,
        borderRadius : 32
    },
    rightArticle : {
        width : '35%',
        height : '100%',
        flexDirection : 'column',
        justifyContent : 'space-around',
        alignItems:'center',
        overflow : 'hidden',
       
        
    },
    leftArticle : {
        width : "50%"
    },
    closeButton : {
        width : 65,
        height : 35,
       marginLeft:2
       
    },
    buttonContainerClose : {
        
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
       
       
    }

})
