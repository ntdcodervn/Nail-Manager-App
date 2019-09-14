import { 
    createStackNavigator, 
    createAppContainer,
    createBottomTabNavigator, 
    createSwitchNavigator
 
} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import LogIn from './../Screens/LogIn';
import UserManager from './../Screens/UserManager';
import Order from './../Screens/Order';
import OrderOld from './../Screens/OrderOld';
import Setting from './../Screens/Setting';


const loginNav = createStackNavigator({
    LogIn : {
        screen : LogIn
    }
});



const bottomTagNavigator = createMaterialBottomTabNavigator({
    Home : {
        screen : UserManager,
        navigationOptions :{
            tilte : 'Home'
        }
    },
    Order : {
        screen : Order,
        navigationOptions :{
            tilte : 'New Order'
        }
    },
    OrderOld : {
        screen : OrderOld,
        navigationOptions :{
            tilte : 'Old Order'
        }
    },
    Setting : {
        screen : Setting,
        navigationOptions :{
            tilte : 'Setting'
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

const appNavigation = createSwitchNavigator({
    LogInScreen : loginNav,
    Home : bottomTagNavigator
})

const MainContainer = createAppContainer(appNavigation);


export default MainContainer;
