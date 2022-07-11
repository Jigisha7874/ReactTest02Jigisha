import React, { useState } from 'react';
import { ActivityIndicator, NativeModules, Pressable, Text, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';
import { saveUser } from '../../features/whiteList';
import { AppStack } from '../../navigator/navActions';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setFuelListArray, setUserMaxAllowance } from '../../features/fuelSlice';


const Login = ({
    navigation
}) => {
    const { ReactFuelNative,FuelNative } = NativeModules;

    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const setDetailHandler = async () => {

        let fuelListArray = [];
        let userMaxAllowance = 0;

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
            let res = await auth().signInWithEmailAndPassword(email, password);
            return res;
        } catch (error) {
            setLoading(false)
            console.log(error);
            if (error.code === 'auth/invalid-email') {
                Toast.show({
                    type: 'error',
                    text1: 'The email address is badly formatted.'
                });
            }
            if (error.code === 'auth/wrong-password') {
                Toast.show({
                    type: 'error',
                    text1: 'The password is invalid or the user does not have a password.'
                });
            }

            if (error.code === 'auth/user-not-found') {
                Toast.show({
                    type: 'error',
                    text1: 'Sorry! User not found.'
                });
            }

            return null;
        }
    }
    const loginHandler = async () => {
        if (email && password) {
            const result = await firebaseLoginhandler()
            console.log('results', result)
            if (result?.user?.uid) {
                // await saveUserToFirebaseDatabase(result.user);
                // const userDetail = await getUserDetail(result.user.uid)
                dispatch(saveUser(result?.user))
                setDetailHandler()
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
                placeholder='Email'
                value={email}
                onChangeText={(value) => setEmail(value)}
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
                onChangeText={(value) => setPassword(value)}
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
                onPress={loginHandler}
            >
                {
                    loading ? <ActivityIndicator size={30} color={'white'} /> :
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 16,
                            }}
                        >Login</Text>
                }
            </Pressable>
            <Text
                onPress={() => {
                    navigation.navigate('Register')
                }}
                style={{
                    marginTop: 20,
                    textAlign: 'center',
                    color: 'black'
                }}
            >Sign up now!</Text>
        </View>
    )
}

export default Login;
