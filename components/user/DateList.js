import { View, Text, TouchableOpacity } from 'react-native';
import { container, button } from '../../static/styles';
import { firebase } from '../../database/functions';
import { useEffect, useState } from 'react';
import DateList from '../etc/DateList';

export default function UserDateListScreen(props) {
    return (
        <View style={container.container}>
            <DateList />
            <TouchableOpacity 
                style={button.mainButton}
                onPress={() => props.navigation.navigate("AddDate")}>
                <Text>Add Date</Text>
            </TouchableOpacity>
        </View>
    )
}