import { Image } from 'react-native';
import { image } from '../../static/styles';
import { SCREEN_HEIGHT } from '../../static/variables';

export default function ImageViewer({ placeholderImageSource, selectedImage, height }) {
    const imageSource = selectedImage !== null 
        ? { uri: selectedImage } 
        : placeholderImageSource;  

    var imageHeight = height ? height : 300;
    imageHeight = (imageHeight > SCREEN_HEIGHT) ? SCREEN_HEIGHT : imageHeight;

    return <Image source={imageSource} style={[image.formImage, {height: imageHeight}]} />;
}