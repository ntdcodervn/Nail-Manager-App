import React, { Component } from 'react'
import { Text, StyleSheet, View,Image, TouchableOpacity } from 'react-native'
import BASE_URL from './../Util/global'


export default class OrderItem extends Component {

    /* props : {
        number, image,nameUser,email, point
    } */
    state = {
        date : ''
    }
    componentWillMount(){
        const d = new Date(this.props.item.slots.date);
        this.setState({
            date : d.getDate() +'-' + (d.getMonth()+1)+ '-' + d.getFullYear(),
        })
    }
    render() {
        return (
            
            <View style={styles.container}>
                
                <Text  style={text_style(16,'#070606',10)}> {this.props.item.key} </Text>
                <Image source={{uri : BASE_URL + this.props.item.users.avatar}} style={{width : 46, height : 46, borderRadius : 10}}></Image>
                <View style={styles.col_name_email}>
                    <Text style={text_style(16,'#340021')}>{this.props.item.users.name}</Text>
                    <Text style={text_style(16,'#340021')}>{this.props.item.users.email.substring(0,20)}...</Text>
                </View>
                <View style={styles.col_point}>
                <Text style={text_style(11,'#340021',0)}>{this.props.item.slots.slotName === null ? '' : this.props.item.slots.slotName}</Text>
                    <Text style={text_style(11,'#340021',0)}>{this.state.date === null ? '' : this.state.date}</Text>
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
