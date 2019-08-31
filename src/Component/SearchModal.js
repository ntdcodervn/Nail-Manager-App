import React, { Component } from 'react'
import { Text, StyleSheet, View , Dimensions,TextInput,TouchableOpacity } from 'react-native'
import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/FontAwesome5';

var screen = Dimensions.get('window');
export default class SearchModal extends Component {

    onShowSearchModal = () => {
        this.refs.myModal.open();
    }

    onSearchData = (keyword) => {
        let listDataWasSearch = [];
        console.log(this.props.listDataAll);
        console.log(keyword)
        if(keyword === '')
        {
            listDataWasSearch = this.props.listDataAll;
        }
        else{
            listDataWasSearch = this.props.listDataAll.filter((value,key) => {
                let string = value.nameUser + value.email + value.point;
                return string.indexOf(keyword) !== -1;
            })
        }
        
        


        this.props.fillOnFlatList(listDataWasSearch);
    }
    state = {
        keyword : ''
    }

    render() {
        return (
            <Modal
                ref={'myModal'}
                style={styles.container}
                position = 'center'
                onClosed={() => {this.setState({keyword : ''})}}
                backdrop = {true}
            >
                <TextInput
                    placeholder='Input keyword'
                    style={{width : '70%', paddingLeft : 10, backgroundColor : 'transparent'}}
                    onChangeText={(value) => {this.setState({keyword : value })}}
                >

                </TextInput>

                <TouchableOpacity
                    style={{flexDirection:'row',color : '#340021'}}
                    onPress={() => {this.onSearchData(this.state.keyword)}}
                >
                <Icon style={{ fontSize : 20 , color : '#340021'}} name='search' size={30} ></Icon>
                    <Text style={{marginLeft : 3,marginRight:1,color:'#340021'}}>Search</Text>
                </TouchableOpacity>
                

            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        justifyContent : 'space-around',
        borderRadius : 25,
        width : screen.width - 50,
        height : 50,
        shadowRadius : 10,
        flexDirection : 'row',
        alignItems : 'center',
    
    }

})
