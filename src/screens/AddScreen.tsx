import React, {useState, useCallback, useEffect, useLayoutEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {useTheme, Button, TextInput} from 'react-native-paper';

// components
import GoBackBtn from '../components/GoBackBtn';
import DoneBtn from '../components/DoneBtn';

// icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AddModal from '../components/AddModal';
import AddScreenTab from '../components/AddScreenTab';
import { HeaderBackButton, HeaderBackContext } from '@react-navigation/elements';

const AddScreen = ({navigation}: {navigation: any}) => {
  const theme = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'New Item',
      headerTitleAlign: 'center',
      headerTransparent: true, // hide header border
      headerTitleStyle: {
        padding: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.onSurfaceVariant,
      },
      headerStyle: {
        backgroundColor: theme.colors.surface,       
      },
      headerLeft: () => React.createElement(HeaderBackButton, {labelVisible: false, onPress: () => navigation.goBack()}),
      headerRight: () => <DoneBtn navigation={navigation}/>,
    });
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: theme.colors.background}}>
      <StatusBar />

      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          backgroundColor: '#fff',
          // paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        {/* <Text>Add Screen</Text> */}
        {/* <AddModal isSwipe={() => {}} closeModal={() => {}} /> */}

        <AddScreenTab isSwipe={() => {}} closeModal={() => {}} />
      </View>
    </SafeAreaView>
  );
};

export default AddScreen;
