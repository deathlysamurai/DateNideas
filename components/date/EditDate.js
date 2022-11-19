import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { container, button, form, text } from '../../static/styles';
import { firebase } from '../../database/functions';
import { Snackbar } from 'react-native-paper';

export default function EditDateScreen(props) {
    // const [title, setTitle] = useState('');
    // const [isValid, setIsValid] = useState(true);
  
    // const handleAddDate = () => {
    //   if (title.length == 0) {
    //       setIsValid({ bool: true, boolSnack: true, message: "Please fill out everything" })
    //       return;
    //   }
  
    //   firebase.date.addDate(title)
    //   .then((res) => { props.navigation.navigate('AccountHome') });
    // }
  
    return (
      <View
        style={container.container}
        behavior="padding"
      >
        <Text>Edit</Text>
        {/* <View style={container.inputContainer}>
          <Text style={text.headerText}>Add Date</Text>
          <TextInput
            placeholder="Title"
            value={title}
            onChangeText={text => setTitle(text)}
            style={form.input}
          />
        </View>
  
        <View style={container.buttonContainer}>
          <TouchableOpacity
            onPress={handleAddDate}
            style={button.mainButton}
          >
            <Text style={button.mainButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
        <Snackbar
              visible={isValid.boolSnack}
              onDismiss={() => { setIsValid({ boolSnack: false }) }}
              action={{label: 'Dismiss'}}>
              {isValid.message}
        </Snackbar> */}
      </View>
    )
}