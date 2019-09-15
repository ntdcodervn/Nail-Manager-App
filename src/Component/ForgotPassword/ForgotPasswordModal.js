import React, { Component } from 'react'
import { Text, StyleSheet, View,Dimensions,TextInput,TouchableOpacity } from 'react-native';
import LinearGradient from'react-native-linear-gradient';
import Modal from 'react-native-modalbox';
import axios from 'axios';
import IconFA  from 'react-native-vector-icons/FontAwesome';
import BASE_URL from './../../Util/global'

const screen = Dimensions.get('window');
export default class ForgotPasswordModal extends Component {
    showForgotPModal = () => {
        this.refs.myModal.open();
    }

    sendNewPassword = async () => {
        try {
            if(this.state.email !== ''){
            const sendNewPass = await axios.get(`${BASE_URL}api/users/getNewPassword?email=${this.state.email}`);
            if(sendNewPass.status === 200)
            {
                alert('Sent new password successfull, please check your mail !');
                this.refs.myModal.close();
            }
            else if(sendNewPass.status === 201)
            {
                alert('Email not found, please try agian !');
            }
            else if(sendNewPass.status === 202)
            {
                alert('Send new password failed,  please try agian !');
            }
            else if(sendNewPass.status(205))
            {
                alert('Email invalidate !');
            }
            else {
                alert('An error occurred, please try again');
            }
            }
            else {
                alert('Email is not empty !');
            }
        } catch (error) {
            console.log(error);
            alert('An error occurred, please try again');
        }
    }

    state = {
        email: ''
    }

    render() {
        return (
            <Modal
            ref={'myModal'}
            style={styles.container}
            position = 'center'
            coverScreen={true}
            backdrop = {true}
            
            >

                <Text style={{fontSize:20, marginBottom :20}}>Send New Password</Text>
                <View style={{width : '80%'}}>
                    <Text>Your email</Text>
                    <TextInput onChangeText={(value) => {this.setState({email : value})}} style={styles.TextInputStyle}></TextInput>
                    <TouchableOpacity 
                    style={styles.SignInButton} 
                        onPress = {() => {this.sendNewPassword()}}
                    >
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={{flexDirection: 'row', height : '100%',borderRadius : 26, alignItems : 'center',justifyContent:'center'}} colors={['#6DD5ED' ,'#2193B0']}>
                            
                                <Text style={{fontSize : 25,fontWeight : 'bold',color:'#FFFFFF'}}>SEND PASSWORD</Text>
                                <IconFA name='send-o' size={25} color='#FFFFFF' style={{marginLeft:7}}/> 
                        
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container :{
        width : '100%',
        justifyContent : 'flex-start',
        borderRadius : 10,
        width : screen.width - 40,
        height : 240,
        flexDirection : 'column',
        alignItems : 'center',
        paddingTop : 13,
        shadowRadius : 10,
    },
    TextInputStyle : {
        width : '100%',
        borderBottomWidth : 2,
        borderBottomColor : 'gray',
        color : '#2F95C3'
    },
    SignInButton : {
        width : '100%',
        height : 51,
        borderRadius : 26,
        marginTop : 20
    },
})
