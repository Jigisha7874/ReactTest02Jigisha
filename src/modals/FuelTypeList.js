
import React, { useCallback, useMemo } from 'react';
import { View, Text, Pressable } from 'react-native';
import { BottomSheetBackdrop, BottomSheetFlatList, BottomSheetModal, BottomSheetModalProvider, useBottomSheetTimingConfigs } from '@gorhom/bottom-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FuelTypeList = ({
    modalizeRef,
    onChangeFuelType,
    fuelListArray
}) => {

    const snapPoints = useMemo(() => ['35%', '40%'], []);

    const renderBackdrop = useCallback(
        props => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                opacity={0.6}
            />
        ),
        []
    );

    const renderHeader = () => {
        return <View
            mpContainer={{ ph: 15 }}
            height={50}
            style={{
                justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center',
                height: 50,
                paddingHorizontal: 15
            }}
        >
            <Text
                style={{ fontSize: 18 }}
            >Select Fuel type</Text>
            <Ionicons
                name='ios-close'
                size={30}
                color='black'
                onPress={() => {
                    modalizeRef?.current?.close();
                }}
            />
        </View>;
    };

    const _renderFuelType = ({ item, index }) => {
        return (
            <Pressable
                style={{
                    backgroundColor: "white",
                    height: 40,
                    borderRadius: 5,
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 15
                }}
                onPress={() => {
                    onChangeFuelType(item);
                }}
            >
                <Text
                    style={{ fontSize: 14, color: 'black' }}
                >{item.fuelType}</Text>
            </Pressable>
        );
    };

    return (
        <BottomSheetModalProvider>
            <BottomSheetModal
                ref={modalizeRef}
                index={0}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                backdropComponent={renderBackdrop}
                handleStyle={{ display: 'none' }}
                backgroundStyle={{ borderRadius: 0 }}
            >
                {renderHeader()}
                <BottomSheetFlatList
                    data={fuelListArray}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={_renderFuelType}
                    ItemSeparatorComponent={() => <View style={{ backgroundColor: 'lightgrey', marginHorizontal: 15, height: 1 }} />}
                />
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
};

export default FuelTypeList;
