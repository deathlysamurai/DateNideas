import { useState, useEffect, useContext } from 'react';
import { Text, TextInput, TouchableOpacity, View, Alert, Image, ScrollView } from 'react-native';
import { container, button, form, text } from '../../static/styles';
import { firebase, sql } from '../../database/functions';
import { Snackbar } from 'react-native-paper';
import { AccountContext } from '../user/Account';
import ImageViewer from '../etc/ImageViewer';
import * as ImagePicker from 'expo-image-picker';

const PlaceholderImage = require('../../assets/rose.jpg');

export default function EditDateScreen(props) {
    const [title, setTitle] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [isValid, setIsValid] = useState(true);
    const [date, setDate] = useState(null);
    const {deleteClicked, setDeleteClicked} = useContext(AccountContext);
    const [height, setHeight] = useState(null);
    const [newImage, setNewImage] = useState(false);

    useEffect(() => {
      setDate(props.route.params.date);
      setTitle(props.route.params.date.title);
      var image = props.route.params.date.image;
      setSelectedImage(image);
      if(image) {
        Image.getSize(image, (width, height) => {
          setHeight(height);
        });
      }
    }, []);

    useEffect(() => {
      if(deleteClicked) { 
        setDeleteClicked(false);
        showConfirmDelete();
       }
    });
  
    const handleEditDate = () => {
      if (title.length == 0) {
          setIsValid({ bool: true, boolSnack: true, message: "Please fill out everything" })
          return;
      }
  
      // firebase.date.editDate(date.id, title)
      sql.date.editDate(date.id, title, selectedImage, newImage)
      .then((res) => { props.navigation.goBack(null) })
      .catch((err) => { console.log(err) });
    }

    const showConfirmDelete = () => {
      Alert.alert("Delete Date?",
        'Are you sure you would like to delete '+date.title+'?',
        [
          {
            text: 'Cancel',
          },
          {
            text: 'Confirm',
            onPress: () => {handleDeleteDate()},
          }
        ], { cancelable: true })
    }

    const handleDeleteDate = () => {
      sql.date.deleteDate(date.id)
      .then((res) => props.navigation.navigate("AccountHome"));
    }

    const pickImageAsync = async () => {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!")
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
      });

      if (!result.cancelled) {
        setHeight(result.height);
        setSelectedImage(result.uri);
        setNewImage(true);
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
            <Text style={text.headerText}>Edit Date</Text>
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
                <Text style={button.accentButtonText}>Update Image</Text>
            </TouchableOpacity>
            <ImageViewer
                placeholderImageSource={PlaceholderImage}
                selectedImage={selectedImage}
                height={height}
              />
          </View>
    
          <View style={container.addButtonContainer}>
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
        </ScrollView>
      </View>
    )
}