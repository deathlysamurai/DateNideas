import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { container } from '../../static/styles';

export default function DateListItem(props) {
    const [date, setDate] = useState(null);

    useEffect(() => {
        setDate(props.date);
    }, []);

    if(date) {
        return (
            <View style={container.container}>
                <Text>{date.title}</Text>
            </View>
        )
    }
}