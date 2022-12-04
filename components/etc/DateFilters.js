import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { IconButton  } from 'react-native-paper';
import { sql } from '../../database/functions';
import { colors } from '../../static/colors';
import PriceContainer from './PriceContainer';

export default function DateFilters({filterDates}) {
    const filterPrice = (price) => {
        sql.date.filterByPrice(price)
        .then((dates) => filterDates(dates))
    }

    return (
        <View style={{flexDirection: 'row'}}>
            <PriceContainer changePrice={filterPrice} />
        </View>
    )
}