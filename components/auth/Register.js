import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { container, button, form, text } from '../../static/styles';
import { Snackbar } from 'react-native-paper';
import { firebase } from '../../database/functions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function RegisterScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleRegister = () => {
    if (email.length == 0 || password.length == 0 || name.length == 0) {
        setIsValid({ bool: true, boolSnack: true, message: "Please fill out everything" })
        return;
    }

    firebase.user.registerUser(email, password, name);
  }

  return (
    <View
      style={container.container}
      behavior="padding"
    >
      <View style={container.inputContainer}>
        <KeyboardAwareScrollView
            contentContainerStyle={container.scrollViewContainer}
          >
          <Text style={text.headerText}>Register</Text>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={text => setName(text)}
            style={form.input}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={form.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            style={form.input}
            secureTextEntry
          />
        </KeyboardAwareScrollView>
      </View>

      <View style={container.buttonContainer}>
        <TouchableOpacity
          onPress={handleRegister}
          style={button.mainButton}
        >
          <Text style={button.mainButtonText}>Register</Text>
        </TouchableOpacity>
        <View style={form.bottomStatement} >
            <Text
                style={text.small}
                onPress={() => props.navigation.navigate("Login")} >
                Already have an account?
                <Text style={text.linkText}>
                    &nbsp;Login
                </Text>
            </Text>
        </View>
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