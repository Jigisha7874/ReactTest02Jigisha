import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const DeviceInfoScreen = ({

}) => {

    useEffect(() => {
        getDeviceData()
    }, [])

    const getDeviceData = () => {
    }


    const InfoItem = ({ title, value }) => {
        return (
            <View style={{
                borderBottomWidth: 1,
                borderBottomColor: 'lightgrey',
                height: 60,
                paddingVertical: 5,
                justifyContent: 'flex-end'
            }} >
                <Text
                    style={{ fontSize: 12, color: 'black' }}
                >{title}</Text>
                <Text
                    style={{
                        fontSize: 16,
                        color: 'black',
                        marginTop: 5
                    }}
                >{value}</Text>
            </View>
        )
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white'
        }} >
            <View style={{
                backgroundColor: 'white',
                paddingVertical: 10,
                paddingHorizontal: 10,
            }}
            >
                <InfoItem
                    title='Unique Device ID'
                    value={DeviceInfo.getDeviceId()}
                />
                <InfoItem
                    title='Device Type / Manufacturer'
                    value={DeviceInfo.getDeviceType()}
                />
                <InfoItem
                    title='Device Name'
                    value={DeviceInfo.getDeviceNameSync()}
                />
                <InfoItem
                    title='Device Model'
                    value={DeviceInfo.getModel()}
                />
                <InfoItem
                    title='System Version'
                    value={DeviceInfo.getSystemVersion()}
                />
                <InfoItem
                    title='Build Number'
                    value={DeviceInfo.getBuildNumber()}
                />
                <InfoItem
                    title='Bundle ID'
                    value={DeviceInfo.getBundleId()}
                />
            </View>
        </View>
    )
}
export default DeviceInfoScreen;
