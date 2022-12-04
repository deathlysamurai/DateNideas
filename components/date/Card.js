import { View, Text, Image, Animated } from 'react-native';
import { container, image } from '../../static/styles';
import { useEffect, useState } from 'react';

const PlaceholderImage = require('../../assets/rose.jpg');

export default function Card(props) {
    const [date, setDate] = useState(null);
    const [imageSource, setImageSource] = useState(null);

    useEffect(() => {
        setDate(props.date);
        const image = props.date.image !== null 
        ? { uri: props.date.image } 
        : PlaceholderImage; 
        setImageSource(image); 
    }, []);

    if(date) {
        return (
            <Animated.View style={[container.container, container.swipeContainer, {transform: props.position.getTranslateTransform()}]} {...props.panResponder.panHandlers}>
                <Image source={imageSource} style={image.dateImage} />
                <Text>{date.title}</Text>
            </Animated.View>
        )
    }
}