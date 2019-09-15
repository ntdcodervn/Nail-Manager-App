import React, { Component } from 'react'
import { Text, StyleSheet, View,TextInput,TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import IconFA  from 'react-native-vector-icons/Feather';
import axios from 'axios';
import BASE_URL from './../../Util/global';
import DataStore from '@react-native-community/async-storage'


export default class ManagerPassword extends Component {

    state = {
        currentPassword : '',
        newPassword : '',
        confirmPassword : ''
    }

    onChangePassword = async () => {
        let token = await DataStore.getItem('token');
        
        if(this.state.newPassword === this.state.confirmPassword)
        {
            const changePassword = await axios.post(`${BASE_URL}api/users/changePassword`,{
                
                    newPassword : this.state.newPassword,
                    currentPassword : this.state.currentPassword
                
            },{
                headers : {
                    "x-auth-token" : token
                }
            });
           
            if(changePassword.status === 200)
            {
                alert('Change password successfull');
            }else if(changePassword.status === 202) {
                alert('Wrong password, please check again');
            }else {
                alert('Change password falied, please try again')
            }
        }
        else {
            alert('Confirm password must be correct');
        }
    }

    render() {
        return (
            <View style={styles.container}>
               
                <View style={styles.container_inner}>
                    <View style={{flexDirection:'row'}}>
                        <IconFA name='lock' size={30} color='#FF00A9' style={{marginBottom:15}}/> 
                        <Text style={{color : '#FF00A9',
                        fontSize : 21.5,
                        fontWeight : 'bold'}}> Change Password </Text>
                    </View>
                    <Text style={styles.textStyle}>- Current password</Text>
                    <TextInput secureTextEntry={true} onChangeText={(value) => {this.setState({currentPassword : value})}} style={styles.TextInputStyle}/>

                    <Text style={styles.textStyle}>- New password</Text>
                    <TextInput secureTextEntry={true} onChangeText={(value) => {this.setState({newPassword : value})}} style={styles.TextInputStyle}/>

                    <Text style={styles.textStyle}>- Confirm password</Text>
                    <TextInput secureTextEntry={true} onChangeText={(value) => {this.setState({confirmPassword : value})}} style={styles.TextInputStyle}/>
                    <Text style={styles.textStyle}>Your password will be encrypted and absolutely secure. </Text>
                    <TouchableOpacity 
                    style={styles.SignInButton} 
                        onPress = {() => {this.onChangePassword()}}
                    >
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={{flexDirection : 'row', height : '100%',borderRadius : 26, alignItems : 'center',justifyContent:'center'}} colors={['#FF00A9' ,'#FF3D81']}>
                            
                                <Text style={{fontSize : 25,fontWeight : 'bold',color:'#FFFFFF'}}>CHANGE</Text>
                                <IconFA name='send' size={25} color='#FFFFFF' style={{marginLeft:7}}/> 
                        
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
        borderBottomWidth : 2,
        borderBottomColor : 'gray',
        color : '#2F95C3'
    },
    textStyle : {
        color : '#2F95C3',
        fontSize : 17,
        fontWeight : 'bold',
        marginTop : 10
    }
})
