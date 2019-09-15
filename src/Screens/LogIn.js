import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TextInput,TouchableOpacity,ScrollView } from 'react-native'

import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import BASE_URL from './../Util/global';
import AsyncStorage from '@react-native-community/async-storage'
import ForgotPasswordModal from './../Component/ForgotPassword/ForgotPasswordModal';




export default class Bill extends Component {
    static navigationOptions = {
        header : null
    };

    state = {
        name: 'Thanh Duy',
        username: '',
        password: ''
    }

    logInHandleClick = async () => {
        try {
           
            let response = await axios.post(`${BASE_URL}api/users/signIn`, {
                email: this.state.username,
                password: this.state.password
            })
            if(response.data.token === null || response.data.token === undefined)
            {
              
                alert('Wrong email or password !!!');
            }
            else {
                    await AsyncStorage.setItem('token', response.data.token);
                    this.props.navigation.navigate("Home");
            }
            
            
            
           
        } catch (error) {
            alert('Error while logging in!');
        }
        
    }

    

    async componentDidMount() {
        const token = await AsyncStorage.getItem("token");
        if(token !== null)
        {
            this.props.navigation.navigate("Home");
        }
    }

    _onPressShowModal = () => {
        this.refs.ForgotPModal.showForgotPModal();
    }

    render() {
        return (
            <ScrollView style={{
                width : "100%",
                height : "100%",
               
            }}>
                
            <View style={styles.container}>
                <ForgotPasswordModal
                    ref={'ForgotPModal'}
                >

                </ForgotPasswordModal>
                <Image
                    source={require('../../assets/Image/project.png')}
                    style={{ width: 200, height: 200 }}
                ></Image>

                <View style={styles.InputContainer}>
                <Text style={styles.Label}> Email </Text>
                    <TextInput
                        style={ styles.textInputStyle}
                        onChangeText={(value) => this.setState({ username: value })}
                    ></TextInput>

                    <Text style={styles.Label}> Password </Text>
                    <TextInput
                        secureTextEntry={true}
                        style={ styles.textInputStyle}
                        onChangeText={(value) => this.setState({ password: value })}
                    ></TextInput>
                </View>
                <TouchableOpacity 
                    style={styles.SignInButton} 
                    onPress = {() => {this.logInHandleClick()}}
                 >
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={{height : '100%',borderRadius : 26, alignItems : 'center',justifyContent:'center'}} colors={['#FF00A9' ,'#FF3D81']}>
                        
                            <Text style={{fontSize : 25,fontWeight : 'bold',color:'#FFFFFF'}}>SIGN IN</Text>
                    
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this._onPressShowModal()}} style={{marginBottom : 30,marginTop : 5}}>
                    <Text style={{fontSize:15}}>Forgot password?</Text>
                </TouchableOpacity>
               
                

            </View>
            </ScrollView>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        height: "100%",
        marginTop : 84,
        
        borderBottomWidth : 1
    },
    textInputStyle : {
        width: "100%", 
        height: 50, 
        borderBottomColor: '#FF3D81' , 
        borderBottomWidth : 2,
        marginBottom : 40,
        color: 'gray',
        padding : 10
       
    },
    InputContainer : {
        width : '80%',
        height : 196,
        marginTop : 75,
    },
    Label : {
        color : '#FF3D81',
        fontSize : 20,
        fontWeight : 'bold'
    },
    SignInButton : {
        width : '80%',
        height : 51,
        borderRadius : 26,
        marginTop : 40,
       
    }
})
