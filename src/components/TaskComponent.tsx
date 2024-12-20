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
  const HandleDeleteAsm = async () => {
    console.log('Delete: ', task.id);
    await DBDeleteAsm(task.id);
    refresh();
  };
  return (
    <TouchableOpacity>
      <View></View>
    </TouchableOpacity>
  );
};

export default TaskComponent;
