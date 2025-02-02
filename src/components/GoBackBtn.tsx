import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, ImageBackground } from 'react-native';
import { useTheme } from 'react-native-paper';

// icons
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';


const GoBackBtn = ({ navigation }: { navigation: any }) => {

  const theme = useTheme();
    
  return (
    <TouchableOpacity
      style={{
        // marginLeft: 5,
        // marginTop: 10,
        // borderWidth: 1,
        // borderColor: theme.colors.outline,
        borderRadius: 50,
        padding: 7,
      }}
      onPress={() => navigation.goBack()}
    >
      {/* <FontAwesome6 name="arrow-left-long" color="#000" size={25} /> */}
      {/* <EvilIcons name="chevron-left" color="#000" size={50} /> */}
      <AntDesign name="arrowleft" color={ theme.colors.onSurfaceVariant } size={25} />
    </TouchableOpacity>
  )
}

export default GoBackBtn