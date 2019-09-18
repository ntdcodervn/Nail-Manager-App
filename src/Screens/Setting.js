import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity,ScrollView,Image } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import ManagerApp from './../Component/Setting/ManagerApp';
import ManagerPassword from './../Component/Setting/ManagerPassword';
import DataStore from '@react-native-community/async-storage';
import BASE_URL from './../Util/global';
import axios from 'axios'


export default class Setting extends Component {
    static navigationOptions = {
        title: 'Setting',
        tabBarIcon : ({tintColor}) => {
            return <Icon name='settings' size={20} color={tintColor} />
        }
    };

    onLogOutEvent = async () => {
        
        await DataStore.removeItem('token');
        this.props.navigation.navigate("LogInScreen");
        console.log('hello');
    }

    state = {
        changePage : false,
        dataAdmin : {}
    }
    handelChangePage = (page) => {
        if(page === 1)
        {
            this.setState({
                changePage : true
            })
        }
        else {
            this.setState({
                changePage : false
            })
        }
        
       console.log(this.state.changePage);
    }

    componentDidMount = async () => {
        const token = await DataStore.getItem('token');
        console.log(token);
        const getDataAdmin = await axios.get(`${BASE_URL}api/users/getDataUser`,{
            headers : {
                'x-auth-token' : token
            }
        });
        console.log(getDataAdmin);
        this.setState({
            dataAdmin : getDataAdmin.data
        })
    }

    _renderComponentPage = () => {
        return this.state.changePage === false ? <ManagerApp  ref={'ManagerApp'} onLogOutEvent={this.onLogOutEvent} /> : <ManagerPassword />;
    };
   

    render() {
        return (
            <ScrollView style={{width:'100%',height:'100%'}}>
            <View style={styles.container}>
                
                 <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.containerRowOne} colors={['#FF00A9' ,'#FF3D81']}>
                
                    <Image source={{uri : BASE_URL + this.state.dataAdmin.avatar}} style={styles.avatar} />
                    <Text style={{fontSize : 24, fontWeight:'bold',color:'#FFFFFF', marginTop : 5, marginBottom : 20}}>Hi {this.state.dataAdmin.name}</Text>
                    <View style={styles.containerRow2}>
                    <TouchableOpacity style={{width : '50%',height:'100%'}} onPress={() =>this.handelChangePage()}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                        
                            style={styles.tabBar} 
                            colors={this.state.changePage === true ?  ['#FFFFFF' ,'#FFFFFF'] : ['#6DD5ED' ,'#2193B0']}
                        >
                            <Text style={{fontSize : 15, fontWeight:'bold',color:this.state.changePage === true?'#2F95C3':'#FFFFFF'}}>Manager App</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width : '50%',height:'100%'}} onPress={() =>this.handelChangePage(1)}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} 
                            style={styles.tabBar} 
                            colors={this.state.changePage === true ? ['#6DD5ED' ,'#2193B0'] : ['#FFFFFF' ,'#FFFFFF'] }
                        >
                             <Text style={{fontSize : 15, fontWeight:'bold',color:this.state.changePage === false?'#2F95C3':'#FFFFFF'}}>Manager Password</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    </View>
                </LinearGradient>
                <View style={styles.containerManager}>
                       {this._renderComponentPage()}
                </View>
               
                
            </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        width : '100%',
        height : '100%',
    },
    containerRowOne : {
        width : '100%',
        height : 263,
        backgroundColor : 'red',
        alignItems : 'center',
        justifyContent : 'center',
        position : 'relative'
    },
    avatar : {
        width : 120,
        height : 120,
        borderRadius : 60,
        backgroundColor : '#FFFFFF'
    },
    containerRow2 : {
        width : '90%',
        height : 60,
        backgroundColor : '#FFFFFF',
        position : 'absolute',
        bottom : -30,
        borderColor : 'gray',
       
        borderRadius : 20,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
      
    },
    tabBar : {
       
        height : '100%',
        borderRadius : 20,
        justifyContent : 'center',
        alignItems : 'center'
    },
    containerManager : {
        width : '100%',
        height :'100%',
       marginTop : 35,
       
    }
})
