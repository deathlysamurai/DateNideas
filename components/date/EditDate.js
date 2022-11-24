import { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { container, button, form, text } from '../../static/styles';
import { firebase } from '../../database/functions';
import { Snackbar } from 'react-native-paper';

export default function EditDateScreen(props) {
    const [title, setTitle] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [date, setDate] = useState(null);

    useEffect(() => {
      setDate(props.route.params.date);
      setTitle(props.route.params.date.title);
    }, []);
  
    const handleEditDate = () => {
      if (title.length == 0) {
          setIsValid({ bool: true, boolSnack: true, message: "Please fill out everything" })
          return;
      }
  
      firebase.date.editDate(date.id, title)
      .then((res) => { props.navigation.goBack(null) })
      .catch((err) => { console.log(err) });
    }
  
    return (
      <View
        style={container.container}
        behavior="padding"
      >
        <View style={container.inputContainer}>
          <Text style={text.headerText}>Edit Date</Text>
          <TextInput
            placeholder="Title"
            value={title}
            onChangeText={text => setTitle(text)}
            style={form.input}
          />
        </View>
  
        <View style={container.buttonContainer}>
          <TouchableOpacity
            onPress={handleEditDate}
            style={button.mainButton}
          >
            <Text style={button.mainButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <Snackbar
              visible={isValid.boolSnack}
              onDismiss={() => { setIsValid({ boolSnack: false }) }}
              action={{label: 'Dismiss'}}>
              {isValid.message}
        </Snackbar>
      </View>
    )
}