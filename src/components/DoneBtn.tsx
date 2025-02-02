import React, {useState, useCallback, useLayoutEffect} from 'react';
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
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';

// components
import AddModal from './AddModal';

// icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const DoneBtn = ({navigation}: {navigation: any}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity>
      <Text
        style={{
          color: theme.colors.primary,
          fontSize: 16,
          fontWeight: 'bold',
        }}>
        Done
      </Text>
    </TouchableOpacity>
  );
};

export default DoneBtn;
