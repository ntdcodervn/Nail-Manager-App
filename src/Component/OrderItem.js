import React, { Component } from 'react'
import { Text, StyleSheet, View,Image, TouchableOpacity } from 'react-native'

export default class OrderItem extends Component {

    /* props : {
        number, image,nameUser,email, point
    } */
    render() {
        return (
            
            <View style={styles.container}>
                
                <Text  style={text_style(16,'#070606',10)}> {this.props.item.key} </Text>
                <Image source={{uri : this.props.item.image}} style={{width : 46, height : 46, borderRadius : 10}}></Image>
                <View style={styles.col_name_email}>
                    <Text style={text_style(16,'#340021')}>{this.props.item.nameUser}</Text>
                    <Text style={text_style(16,'#340021')}>{this.props.item.email}</Text>
                </View>
                <View style={styles.col_point}>
                    <Text style={text_style(11,'#340021',0)}>{this.props.item.time}</Text>
                </View>
            </View>
           
        )
    }
}

const text_style = (fontSize,color, marginRight ,fontFamily ) => {
    return {
        fontSize : fontSize,
        color : color,
        marginRight : marginRight,
       
    }
}

const styles = StyleSheet.create({
    container : {
        width : "100%",
        flexDirection : 'row',
        justifyContent : "flex-start",
        alignItems :'center',
        position : 'relative'
    },
    col_name_email : {
        marginLeft : 10
    },
    col_point : {
        position : 'absolute',
        right : 0
    }
})
