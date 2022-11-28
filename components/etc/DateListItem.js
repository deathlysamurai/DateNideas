import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { container, list, text } from '../../static/styles';
import { firebase } from '../../database/functions';

export default function DateListItem(props) {
    const [date, setDate] = useState(null);

    useEffect(() => {
        setDate(props.date);
    });

    // const deleteDate = () => {
    //     firebase.date.deleteDate(date.id);
    // }

    if(date) {
        return (
            <View style={container.dateContainer}>
                <TouchableOpacity 
                    onPress={() => props.navigation.navigate("EditDate", {date: date}) }
                >
                    <Text style={text.center}>{date.title}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}