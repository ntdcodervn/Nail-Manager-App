import React, { Component } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'
import { createStackNavigator, createAppContainer,createBottomTabNavigator } from 'react-navigation';
import App from './Navigator/app'
export default class Main extends Component {
    render() {
        return (
            <App></App>
        )
    }
}

const styles = StyleSheet.create({})
