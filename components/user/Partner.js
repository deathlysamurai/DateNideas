import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { container, text, form, button, list } from '../../static/styles';
import { firebase } from '../../database/functions';
import { Snackbar } from 'react-native-paper';

export default function PartnerScreen(props) {
  const [partner, setPartner] = useState(null);
  const [requests, setRequests] = useState(null);
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    firebase.user.getPartner()
    .then((partner) => {
      setPartner(partner);
    });
    firebase.user.getRequests()
    .then((requests) => {
      setRequests(requests);
    });
  }, []);

  const requestPartner = () => {
    firebase.user.requestPartner(email.toLowerCase())
    .then((partner) => {
      if(partner) {
        setIsValid({ bool: true, boolSnack: true, message: "Request sent to " + partner.name });
      }
    });
  }

  const showFindPartner = () => {
    return(
      <View>
        <View>
          <Text style={text.headerText}>Request Partner</Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={form.input}
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => requestPartner()}
            style={button.mainButton}
          >
            <Text style={button.mainButtonText}>Request</Text>
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
  };

  const showPartner = () => {
    return(
      <View>
        <Text>{partner.name}</Text>
      </View>
    )
  };

  const showRequests = () => {
    return (
      <View>
        <Text style={text.headerText}>Requests</Text>
        <FlatList
          data={requests}
          renderItem={({ item }) => requestItem(item)}
        />
      </View>
    )
  }

  const requestItem = (request) => {
    return (
        <View style={list.highlighted}>
            <Text>{request.name}</Text>
            <Text>{request.email}</Text>
        </View>
    )
  }

  return (
    <View>
      {requests ? showRequests() : null}
      {partner ? showPartner() : showFindPartner()}
    </View>
  )
}