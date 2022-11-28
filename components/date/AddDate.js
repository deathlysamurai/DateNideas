import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { container, button, form, text } from '../../static/styles';
import { firebase, sql } from '../../database/functions';
import { Snackbar } from 'react-native-paper';
import ImageViewer from '../etc/ImageViewer';
import * as ImagePicker from 'expo-image-picker';

const PlaceholderImage = require('../../assets/rose.jpg');

export default function AddDateScreen(props) {
    const [title, setTitle] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [isValid, setIsValid] = useState(true);
    const [height, setHeight] = useState(null);
  
    const handleAddDate = () => {
      if (title.length == 0) {
          setIsValid({ bool: true, boolSnack: true, message: "Please fill out everything" })
          return;
      }
  
      // firebase.date.addDate(title)
      sql.date.addDate(title, selectedImage)
      .then((res) => { props.navigation.navigate('AccountHome') })
      .catch((err) => console.log(err));
    }

    const pickImageAsync = async () => {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        console.log("Permission to access camera roll is required!")
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
      });

      if (!result.cancelled) {
        setHeight(result.height);
        setSelectedImage(result.uri);
      } else {
        alert('You did not select any image.');
      }
    };
  
    return (
      <View
        style={container.container}
        behavior="padding"
      >
        <ScrollView contentContainerStyle={{width: '100%'}}>
          <View style={container.inputContainer}>
            <Text style={text.headerText}>Add Date</Text>
            <TextInput
              placeholder="Title"
              value={title}
              onChangeText={text => setTitle(text)}
              style={form.input}
            />
            <TouchableOpacity
              onPress={pickImageAsync}
              style={button.imageButton}
            >
              <Text style={button.accentButtonText}>Change Image</Text>
            </TouchableOpacity>
            <ImageViewer
              placeholderImageSource={PlaceholderImage}
              selectedImage={selectedImage}
              height={height}
            />
          </View>
    
          <View style={container.addButtonContainer}>
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
          </Snackbar>
        </ScrollView>
      </View>
    )
}