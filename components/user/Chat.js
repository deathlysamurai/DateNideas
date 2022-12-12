import { View, Text, TouchableOpacity } from 'react-native';
import { container, button } from '../../static/styles';
import * as WebBrowser from 'expo-web-browser';


export default function ChatScreen(props) {

  return (
    <View style={container.container}>
        <View style={container.buttonContainer}>
              <TouchableOpacity 
                style={button.mainButton}
                onPress={() => WebBrowser.openBrowserAsync('https://github.com/deathlysamurai/DateNideas')}>
                  <Text>View Source Code</Text>
              </TouchableOpacity>
        </View>
    </View>
  )
}