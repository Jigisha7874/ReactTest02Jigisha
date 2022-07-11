import React from 'react';
import { Text, View } from 'react-native';
import { currency } from '../utility/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FuelItems = ({
fuelType,
price,
type,
unit,
removeItem
}) => {
    return (
        <View style={{
            backgroundColor: 'white',
            height: 80,
            marginHorizontal: 15,
            borderWidth: 1,
            borderColor: 'lightgrey',
            paddingHorizontal: 10,
            justifyContent: 'center',
            borderRadius: 5
        }} >
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
            }} >
                <Text style={{
                    fontSize: 15,
                    color: 'black'
                }} >Fuel Type:</Text>
                <Text style={{
                    fontSize: 15,
                    color: 'black',
                    marginHorizontal: 5
                }} >{fuelType}</Text>
            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5
            }} >
                <Text style={{
                    fontSize: 15,
                    color: 'black'
                }} >Fuel used:</Text>
                <Text style={{
                    fontSize: 15,
                    color: 'black',
                    marginHorizontal: 5,
                }} >{unit} {type}</Text>
            </View>
            <Ionicons
                name='ios-close-circle'
                size={25}
                color='red'
                style={{
                    position: 'absolute',
                    top: 2,
                    right: 5,
                    color: 'orange'
                }}
                onPress={removeItem}
            />
            <Text
                style={{
                    position: 'absolute',
                    right: 10,
                    bottom: 10,
                    color: 'red'
                }}
            >{price} {currency}</Text>
        </View>
    )
}
export default FuelItems;