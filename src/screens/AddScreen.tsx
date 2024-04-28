import React, { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView, StatusBar, View, Text, Dimensions, Image, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight } from 'react-native'
import { useTheme, Button, TextInput } from 'react-native-paper';

// components
import GoBackBtn from '../components/GoBackBtn';

// icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const AddScreen = ({ navigation }: { navigation: any }) => {

  const theme = useTheme();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Add New Item',
      headerTitleAlign: 'center',
      headerTransparent: true, // hide header border
      headerTitleStyle: {
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold',
      },
      headerStyle: {
        backgroundColor: 'red',
        // shadowColor: 'transparent',
      },
      headerLeft: () => <GoBackBtn navigation={navigation} />
    })
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background }}>
      <StatusBar />

      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 80,
        }}
      >
        <Text>Add Screen</Text>

      </View>

    </SafeAreaView>
  )
}

export default AddScreen;