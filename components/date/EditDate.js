import { useState, useEffect, useContext } from 'react';
import { Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { container, button, form, text } from '../../static/styles';
import { firebase, sql } from '../../database/functions';
import { Snackbar } from 'react-native-paper';
import { AccountContext } from '../user/Account';
import ImageViewer from '../etc/ImageViewer';

const PlaceholderImage = require('../../assets/rose.jpg');

export default function EditDateScreen(props) {
    const [title, setTitle] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [isValid, setIsValid] = useState(true);
    const [date, setDate] = useState(null);
    const {deleteClicked, setDeleteClicked} = useContext(AccountContext);
    const [height, setHeight] = useState(null);

    useEffect(() => {
      setDate(props.route.params.date);
      setTitle(props.route.params.date.title);
      setSelectedImage(props.route.params.date.image);
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
      sql.date.editDate(date.id, title)
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
          <TouchableOpacity
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