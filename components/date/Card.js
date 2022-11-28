import { View, Text, Image } from 'react-native';
import { container, image } from '../../static/styles';
import { useEffect, useState } from 'react';

export default function Card(props) {
    const [date, setDate] = useState(null);

    useEffect(() => {
        console.log(props)
        setDate(props.date);
    });

    return (
        <View style={container.container}>
            <Image source={date.image} style={image.dateImage} />
            <linearGradient colors={['transparent', 'rgba(0,0,0,0.9)']} style={image} />
            <Text>{date.title}</Text>
        </View>
    )
}