import React, { useState, useCallback, useLayoutEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView, StatusBar, View, Text, Dimensions, Image, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight } from 'react-native'
import { useTheme, Button, TextInput } from 'react-native-paper';

// icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// components
import GoBackBtn from '../components/GoBackBtn';

// backend
import { AuthGetCurrentUser } from '../utils/auth';

const ScheduleScreen = () => {

  const theme = useTheme();

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background }}>
      <StatusBar />

      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 30,
        }}
      >
        <Text>Schedule Screen</Text>

      </View>

    </SafeAreaView>
  )
}

export default ScheduleScreen;