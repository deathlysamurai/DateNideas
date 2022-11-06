import { View, Text, TouchableOpacity } from 'react-native';
import { container, button } from '../../static/styles';
import { useState } from 'react';
import { firebase } from '../../database/functions';

export default function RandomScreen(props) {
  const [date, setDate] = useState(null);

  const getRandomDate = () => {
    firebase.date.getRandomDate()
    .then((date) => {
      setDate(date);
    });
  }

  return (
    <View style={container.container}>
      <View>
        {date ? <Text>{date.title}</Text> : <Text></Text>}
      </View>
      <View>
        <TouchableOpacity
            onPress={getRandomDate}
            style={button.mainButton}
          >
            <Text style={button.mainButtonText}>Random Date</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}