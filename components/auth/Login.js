import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { container, button, form, text } from '../../static/styles';
import { firebase } from '../../database/functions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function LoginScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <View
      style={container.container}
      behavior="padding"
    >
      <View style={container.inputContainer}>
        <KeyboardAwareScrollView
          contentContainerStyle={container.scrollViewContainer}
        >
          <Text style={text.headerText}>Login</Text>
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
          onPress={() => firebase.user.loginUser(email, password)}
          style={button.mainButton}
        >
          <Text style={button.mainButtonText}>Login</Text>
        </TouchableOpacity>
        <View style={form.bottomStatement} >
            <Text
                style={text.small}
                onPress={() => props.navigation.navigate("Register")} >
                Don't have an account?
                <Text style={text.linkText}>
                    &nbsp;Register
                </Text>
            </Text>
        </View>
      </View>
    </View>
  )
}

// function Login({ navigation }) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <StatusBar barStyle="dark-content" backgroundColor={colors.lightBackground} />
//         <Text style={styles.title}>Date Nideas</Text>
//       </SafeAreaView>
//     );
//   }