import React, { Component } from 'react'
import { Text, StyleSheet, View,TextInput,TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFA  from 'react-native-vector-icons/Feather';

export default class ManagerPassword extends Component {
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
                    <TextInput style={styles.TextInputStyle}/>

                    <Text style={styles.textStyle}>- New password</Text>
                    <TextInput style={styles.TextInputStyle}/>

                    <Text style={styles.textStyle}>- Confirm password</Text>
                    <TextInput style={styles.TextInputStyle}/>
                    <Text style={styles.textStyle}>Your password will be encrypted and absolutely secure. </Text>
                    <TouchableOpacity 
                    style={styles.SignInButton} 
                        onPress = {() => {alert('Hello')}}
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
