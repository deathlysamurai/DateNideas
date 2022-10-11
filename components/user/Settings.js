import { View, TouchableOpacity, Text } from 'react-native';
import { container, button } from '../../static/styles';
import { firebase } from '../../database/functions';

export default function SettingsScreen(props) {

  return (
    <View style={container.container}>
        <View style={container.buttonContainer}>
            <TouchableOpacity 
                style={button.mainButton}
                onPress={() => firebase.user.logoutUser()}>
                <Text>Log Out</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}