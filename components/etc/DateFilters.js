import { View, Text, TouchableOpacity } from 'react-native';

export default function DateFilters({filterDates}) {
    const filterPrice = () => {
        filterDates('Test');
    }

    return (
        <View>
            <TouchableOpacity 
                onPress={() => filterPrice()}>
            </TouchableOpacity>
        </View>
    )
}