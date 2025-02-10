import React, {useState, useCallback, useLayoutEffect, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Text,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {useTheme, Button, TextInput, Checkbox} from 'react-native-paper';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import ColorPicker, {
  Panel1,
  Panel2,
  Panel3,
  Panel4,
  Panel5,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
} from 'reanimated-color-picker';
import Animated from 'react-native-reanimated';

// components
import AddReminder from './AddReminder';
import AddAsm from './AddAsm';
import AddTask from './AddTask';
import AddDeadline from './AddDeadline';

// icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

// backend
import {DBFetchTagsByUserId, DBCreateTag, DBUpdateTag} from '../utils/db';

// Redux Toolkit
import {useSelector, useDispatch} from 'react-redux';
import {selectCurrentUserID} from '../stores/AuthSlice';

const TagComponent = ({tag}: {tag: any}) => {
  const [bgColor, setBgColor] = useState<any>(tag.color_code);
  const [textColor, setTextColor] = useState<any>();

  const getTextColor = (bgColor: string) => {
    // Convert hex color to RGB
    const rgb = parseInt(bgColor.replace('#', ''), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    // Calculate the relative luminance
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // Return white or black based on luminance
    return luminance > 128 ? '#000' : '#fff';
  };

  useEffect(() => {
    setBgColor(tag.color_code);
    setTextColor(getTextColor(tag.color_code));
  }, [tag]);

  return (
    <View
      style={{
        backgroundColor: bgColor,
        padding: 5,
        borderRadius: 5,
      }}>
      <Text
        style={{
          color: textColor,
        }}>
        # {tag.title}
      </Text>
    </View>
  );
};

export default TagComponent;
