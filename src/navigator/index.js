import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import CreateList from '../screens/CreateList';
import FuelList from '../screens/FuelList';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Splash from '../screens/Splash';
import DeviceInfoScreen from '../screens/DeviceInfoScreen';

const AppContainer = ({

}) => {
    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator
            initialRouteName='Users'
            screenOptions={{
                animation: 'slide_from_right'
            }}
        >
            <Stack.Screen
                component={Splash}
                name='Splash'
                options={{ headerShown: false }}
            />
            <Stack.Screen
                component={Login}
                name='Login'
            />
            <Stack.Screen
                component={Register}
                name='Register'
            />
            <Stack.Screen
                component={FuelList}
                name='FuelList'
                options={({ navigation }) => ({
                    headerTitle: 'Fuel List'
                })}
            />
            <Stack.Screen
                component={CreateList}
                name='CreateList'
                options={({ navigation }) => ({
                    headerTitle: 'Create your list'
                })}
            />
            <Stack.Screen
                component={DeviceInfoScreen}
                name='DeviceInfo'
                options={({ navigation }) => ({
                    headerTitle: 'Device info'
                })}
            />
        </Stack.Navigator>
    )
}

export default AppContainer;