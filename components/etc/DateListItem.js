import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { container, list } from '../../static/styles';
import { Ionicons } from '@expo/vector-icons';
import { firebase } from '../../database/functions';

export default function DateListItem(props) {
    const [date, setDate] = useState(null);

    useEffect(() => {
        setDate(props.date);
    }, []);

    const deleteDate = () => {
        firebase.date.deleteDate(date.id);
    }

    if(date) {
        return (
            <View style={[container.container, list.highlighted]}>
                <Text><Ionicons name="remove" size={24} color="red" onPress={deleteDate} /> {date.title}</Text>
            </View>
        )
    }
}