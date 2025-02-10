import React, {useState, useCallback, useLayoutEffect, useEffect} from 'react';
import {
  ScrollView,
  SafeAreaView,
  StatusBar,
  View,
  Text,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
  RefreshControl,
  ActivityIndicator,
  Animated,
} from 'react-native';
import {useTheme, Button, TextInput, Switch, Divider} from 'react-native-paper';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';

// icons
import Octicons from 'react-native-vector-icons/Octicons';

// backend
import {DBDeleteAsm} from '../utils/db';

const TaskComponent = ({task, refresh}: {task: any; refresh: () => void}) => {
  return (
    <TouchableOpacity
      style={{
        width: 200,
        height: 125,
        borderRadius: 7,
        marginRight: 10,
        padding: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
      }}>
      <Text>{task?.title}</Text>
      <Text>{task?.date}</Text>
    </TouchableOpacity>
  );
};

export default TaskComponent;
