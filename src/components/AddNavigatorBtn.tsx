import React, { useState, useCallback, useLayoutEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView, StatusBar, View, Text, Dimensions, Image, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight } from 'react-native'
import { useTheme, Button, TextInput } from 'react-native-paper';
import Modal from "react-native-modal";

// icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const AddNavigatorBtn = (props: any) => {

  const theme = useTheme();

  return (
    <View>
      <TouchableOpacity
        {...props}
        style={{
          top: -25,
          justifyContent: 'center',
          borderWidth: 7,
          borderColor: theme.colors.primaryContainer,
          alignItems: 'center',
          width: 70,
          height: 70,
          borderRadius: 100,
          backgroundColor: theme.colors.primary,
        }}
      >
        <AntDesign name='plus' size={24} color="#fff" />
      </TouchableOpacity>

      <Modal isVisible={true} >
        <View
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 30,
          }}
        >
          <Text>Modal</Text>
        </View>
      </Modal>

    </View>
  )
}

export default AddNavigatorBtn;