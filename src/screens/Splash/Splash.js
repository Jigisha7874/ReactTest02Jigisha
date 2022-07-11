import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const Splash = ({
    navigation
}) => {
    const { user } = useSelector((state) => state.whiteList)
    useEffect(() => {
        getUser()
    }, [])

    const getUser = () => {
        if (user) {
            navigation.replace('FuelList')
        } else {
            navigation.replace('Login')
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }} >
            <Text>Loading..</Text>
        </View>
    )
}
export default Splash;