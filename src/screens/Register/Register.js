import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, TextInput, View, NativeModules, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';
import { saveUser } from '../../features/whiteList';
import { AppStack } from '../../navigator/navActions';
import * as constans from '../../utility/constants';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setFuelListArray, setUserMaxAllowance } from '../../features/fuelSlice';

const Register = ({
    navigation
}) => {
    const { ReactFuelNative, FuelNative } = NativeModules;
    const dispatch = useDispatch();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)

    const setDetailHandler = async () => {
        let fuelListArray = [];
        let userMaxAllowance = 0
        if (Platform.OS === 'ios') {
            fuelListArray = await FuelNative.fuelListArray()
            userMaxAllowance = await FuelNative.getUserMaxAllowance()

        } else {
            fuelListArray = await ReactFuelNative.fuelListArray()
            userMaxAllowance = await ReactFuelNative.getUserMaxAllowance()
        }

        await AsyncStorage.setItem('userMaxAllowance', JSON.stringify(userMaxAllowance))
        await AsyncStorage.setItem('fuelList', JSON.stringify(fuelListArray))

        console.log('fuelListArray', fuelListArray)
        console.log('userMaxAllowance', userMaxAllowance)
        
        try {
            let parsedMaxAlowance = await AsyncStorage.getItem('userMaxAllowance')
            let parsedFuelList = await AsyncStorage.getItem('fuelList')

            let userMaxAllowance = JSON.parse(parsedMaxAlowance)
            let fuelListArray = JSON.parse(parsedFuelList)
            // console.log('userMaxAllowance', userMaxAllowance)
            dispatch(setUserMaxAllowance(userMaxAllowance))
            dispatch(setFuelListArray(fuelListArray))

        } catch (error) {
            console.log('error from getting userMaxAllowance', error)
        }
    }

    const firebaseLoginhandler = async () => {
        setLoading(true)
        try {
            let res = await auth().createUserWithEmailAndPassword(email, password);
            return res;
        } catch (error) {
            setLoading(false)
            console.log(error);
            if (error.code === 'auth/email-already-in-use') {
                // dispatch(messageHandler('That email address is already in use!'));
                Toast.show({
                    type: 'error',
                    text1: 'That email address is already in use!'
                });
            }
            if (error.code === 'auth/invalid-email') {
                Toast.show({
                    type: 'error',
                    text1: 'That email address is invalid!'
                });
            }
            return null;
        }
    }
    const registerHandler = async () => {
        if (email && password && name) {
            const result = await firebaseLoginhandler()
            console.log('result', result)
            if (result?.user?.uid) {
                await auth().currentUser.updateProfile({
                    displayName: name
                })
                setDetailHandler()
                dispatch(saveUser(auth().currentUser))
                setLoading(false)
                navigation.dispatch(AppStack)
            }
        } else {
            Toast.show({
                type: 'error',
                text1: 'All field is required!'
            });
        }
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white'
        }} >
            <TextInput
                style={{
                    marginHorizontal: 15,
                    marginTop: 15,
                    borderBottomWidth: 1,
                    borderBottomColor: 'lightgrey',
                    paddingLeft: 0,
                    paddingVertical: 4
                }}
                placeholder='Name'
                value={name}
                onChangeText={(val) => setName(val)}
            />
            <TextInput
                style={{
                    marginHorizontal: 15,
                    marginTop: 15,
                    borderBottomWidth: 1,
                    borderBottomColor: 'lightgrey',
                    paddingLeft: 0,
                    paddingVertical: 4
                }}
                placeholder='Email'
                value={email}
                onChangeText={(val) => setEmail(val)}
            />
            <TextInput
                style={{
                    marginHorizontal: 15,
                    marginTop: 15,
                    borderBottomWidth: 1,
                    borderBottomColor: 'lightgrey',
                    paddingLeft: 0,
                    paddingVertical: 4
                }}
                placeholder='Password'
                value={password}
                onChangeText={(val) => setPassword(val)}
            />
            <Pressable
                style={{
                    backgroundColor: 'green',
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 15,
                    marginTop: 15,
                    borderRadius: 4
                }}
                onPress={registerHandler}
            >
                {
                    loading ? <ActivityIndicator size={30} color={'white'} /> :
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 16,
                            }}
                        >Register</Text>
                }
            </Pressable>
        </View>
    )

}

export default Register;