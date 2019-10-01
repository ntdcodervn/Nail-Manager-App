import React, { Component } from 'react'
import { Text, StyleSheet, View,TextInput,TouchableOpacity,Alert } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFA  from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import BASE_URL from './../../Util/global'
import DataStore from '@react-native-community/async-storage'



export default class ManagerApp extends Component {

    

    state = {
        emailTo : '',
        body : ''
    
    }

    sendNofi = async () => {
       
        Alert.alert(
            'Notification',
            'Are you sure you want to push this notification ?',
            [
                {  
                    text: 'No',  
                    onPress: () => console.log('Cancel Pressed'),  
                    style: 'cancel',  
                },  
                {text: 'Yes', onPress: async () => {
                    const send = await axios.get(`http://207.148.89.170:5000/api/push?key=AIzaSyDuWlCD_T3YgxiQyuUDLmDTinK6kW5Veec&title=MyNails2Go Notification&body=${this.state.body}&topic=all`);
                    if(send.data.message_id)
                    {
                        alert('Push notification successful');
                    }
                    else {
                        alert('Push notification failed, please try again !')
                    }
                }},  
            ]

        )
    }

    sendMail = async () => {
        const token = await DataStore.getItem('token');
        console.log(this.state.emailTo)
        const sendMails = await axios.post(`${BASE_URL}api/admin/exportCalendar`,{
            emailTo : this.state.emailTo
        },{
            headers : {
                'x-auth-token' : token
            },
            
        })
        console.log(sendMails);
       if(sendMails.status === 200)
       {
           alert('Sent mail successful, Please check your mail.');
       }else {
            alert('Sent mail falied, Please check your profile.')
       }
    }

    

    render() {
        return (
            <View style={styles.container}>
               
                <View style={styles.container_inner}>
                    <View style={{flexDirection:'row'}}>
                        <Icon name='gmail' size={30} color='#FF00A9' style={{marginBottom:15}}> </Icon>
                        <Text style={{color : '#FF00A9',
                        fontSize : 21.5,
                        fontWeight : 'bold'}}> Send ICS File </Text>
                    </View>
                    <Text style={styles.textStyle}>- Email To</Text>
                    <TextInput onChangeText={(value) => {this.setState({emailTo : value})}} style={styles.TextInputStyle}/>
                    <Text style={styles.textStyle}>If you can’t find your mail, try to search in the spam. </Text>
                    <TouchableOpacity 
                    style={styles.SignInButton} 
                        onPress = {() => {this.sendMail()}}
                    >
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={{flexDirection : 'row', height : '100%',borderRadius : 26, alignItems : 'center',justifyContent:'center'}} colors={['#FF00A9' ,'#FF3D81']}>
                            
                                <Text style={{fontSize : 25,fontWeight : 'bold',color:'#FFFFFF'}}>SEND</Text>
                                <IconFA name='send-o' size={25} color='#FFFFFF' style={{marginLeft:7}}/> 
                        
                        </LinearGradient>
                    </TouchableOpacity>

                    <View style={{flexDirection:'row', marginTop : 50}}>
                        <Icon name='bell-ring-outline' size={30} color='#FF00A9' style={{marginBottom:15}}> </Icon>
                        <Text style={{color : '#FF00A9',
                        fontSize : 21.5,
                        fontWeight : 'bold'}}>  Push Notifications  </Text>
                    </View>
                    <Text style={styles.textStyle}>- Content</Text>
                    <TextInput style={styles.TextInputStyle} onChangeText={(value) => {this.setState({body : value})}}/>
                    
                    <TouchableOpacity 
                    style={styles.SignInButton} 
                        onPress = {() => {this.sendNofi()}}
                    >
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={{height : '100%',borderRadius : 26,flexDirection:'row', alignItems : 'center',justifyContent:'center'}} colors={['#FF00A9' ,'#FF3D81']}>
                               
                                <Text style={{fontSize : 25,fontWeight : 'bold',color:'#FFFFFF'}}>PUSH</Text>
                                <Icon name='bell-ring-outline' size={25} color='#FFFFFF' style={{marginLeft:4}}> </Icon>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    style={styles.SignInButton} 
                        onPress = {() => {this.props.onLogOutEvent()}}
                    >
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={{flexDirection: 'row', height : '100%',borderRadius : 26, alignItems : 'center',justifyContent:'center'}} colors={['#6DD5ED' ,'#2193B0']}>
                            
                                <Text style={{fontSize : 25,fontWeight : 'bold',color:'#FFFFFF'}}>LOG OUT</Text>
                                <IconFA name='sign-out' size={25} color='#FFFFFF' style={{marginLeft:7}}/> 
                        
                        </LinearGradient>
                    </TouchableOpacity>
                    
                </View>
               
                 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        width : '100%',
        height : '100%',
        flexDirection :'column',
        alignItems : 'center',
        justifyContent : 'center',
        marginTop : 15
        
    }
   
    ,
    SignInButton : {
        width : '100%',
        height : 51,
        borderRadius : 26,
        marginTop : 10
    },
    container_inner : {
        width : '80%',
        height : '100%',
    },
    container_inner2 : {
        width : '80%',
        height : '100%',
    }
    ,
    TextInputStyle : {
        width : '100%',
        height : 50,
        borderBottomWidth : 2,
        borderBottomColor : 'gray',
        color : '#2F95C3',
        
    },
    textStyle : {
        color : '#2F95C3',
        fontSize : 17,
        fontWeight : 'bold',
        marginTop : 10
    }
})
