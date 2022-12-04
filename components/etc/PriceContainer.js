import { useState } from 'react';
import { View } from 'react-native';
import { IconButton  } from 'react-native-paper';
import { colors } from '../../static/colors';

export default function PriceContainer({changePrice}) {
    const [priceColors, setPriceColors] = useState(['#444', '#444', '#444', '#444', '#444']);

    const updatePrice = (price) => {
        changePrice(price);
    }

    return (
        <View style={{flexDirection: 'row'}}>
            <IconButton
                icon="currency-usd-off"
                color={priceColors[0]}
                size={20}
                onPress={() => {
                    setPriceColors([colors.accentPink, '#444', '#444', '#444', '#444']);
                    updatePrice('FREE');
                }}
            />
            <IconButton
                icon="currency-usd"
                color={priceColors[1]}
                size={20}
                onPress={() => {
                    setPriceColors(['#444', colors.accentPink, '#444', '#444', '#444']);
                    updatePrice('$');
                }}
            />
            <IconButton
                icon="currency-usd"
                color={priceColors[2]}
                size={20}
                onPress={() => {
                    setPriceColors(['#444', colors.accentPink, colors.accentPink, '#444', '#444']);
                    updatePrice('$$');
                }}
            />
            <IconButton
                icon="currency-usd"
                color={priceColors[3]}
                size={20}
                onPress={() => {
                    setPriceColors(['#444', colors.accentPink, colors.accentPink, colors.accentPink, '#444']);
                    updatePrice('$$$');
                }}
            />
            <IconButton
                icon="currency-usd"
                color={priceColors[4]}
                size={20}
                onPress={() => {
                    setPriceColors(['#444', colors.accentPink, colors.accentPink, colors.accentPink, colors.accentPink]);
                    updatePrice('$$$$');
                }}
            />
        </View>
    )
}