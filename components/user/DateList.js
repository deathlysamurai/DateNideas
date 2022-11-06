import { View, Text, TouchableOpacity } from 'react-native';
import { container, button } from '../../static/styles';
import DateList from '../etc/DateList';

export default function UserDateListScreen(props) {
    return (
        <View style={container.container}>
            <DateList />
            <TouchableOpacity 
                style={button.mainButton}
                onPress={() => props.navigation.navigate("AddDate")}>
                <Text style={button.mainButtonText}>Add Date</Text>
            </TouchableOpacity>
        </View>
    )
}