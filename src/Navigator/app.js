import { 
    createStackNavigator, 
    createAppContainer,
    createBottomTabNavigator, 
 
} from 'react-navigation';
import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import Bill from './../Screens/Bill';
import UserManager from './../Screens/UserManager';


const BillStack = createStackNavigator({
    Bill : {
        screen : Bill
    }
});

const BillNotPayStack = createStackNavigator({
    UserManager : {
        screen : UserManager
    }
});

const bottomTagNavigator = createMaterialBottomTabNavigator({
    Home : {
        screen : UserManager,
        navigationOptions :{
            tilte : 'Home'
        }
    },
    Bill : {
        screen : Bill,
        navigationOptions :{
            tilte : 'Bill'
        }
    }
},{
    initialRouteName : 'Home',
    activeTintColor : '#F206E0',
    inactiveTintColor : '#B5A4A4',
    barStyle :{
        backgroundColor : '#FFFFFF',
        
    }
    
    
    
});

const MainContainer = createAppContainer(bottomTagNavigator);


export default MainContainer;
