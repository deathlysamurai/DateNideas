import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { container, text, form, button } from '../../static/styles';
import { firebase } from '../../database/functions';
import { Snackbar } from 'react-native-paper';

export default function InfoScreen(props) {
  return (
    <View style={container.container}>
      <View style={container.buttonContainer}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Partner")}
          style={button.mainButton}
        >
          <Text style={button.mainButtonText}>View Partners</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}