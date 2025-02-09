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

const EditTagModal = ({
  closeEditModal,
  tagToEdit,
  tagType,
  userId,
}: {
  closeEditModal: () => void;
  tagToEdit: any;
  tagType: string;
  userId: any;
}) => {
  const theme = useTheme();

  const [title, setTitle] = useState(tagToEdit?.title);
  const [colorCode, setColorCode] = useState(tagToEdit?.color_code);
  const [textColor, setTextColor] = useState(tagToEdit?.text_color);

  const [colorExpanded, setColorExpanded] = useState(false);

  const onSelectColor = ({hex}: {hex: string}) => {
    console.log('hex: ', hex);
    setColorCode(hex);
  };

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

  const handleSaveTag = async () => {
    if (tagToEdit != null) {
      // update tag
      await DBUpdateTag(tagToEdit.id, title, colorCode);
      console.log('Updated Tag: ', tagToEdit.id, title, colorCode);
    } else {
      // create tag
      await DBCreateTag(title, tagType, colorCode, userId);
      console.log('Created Tag: ', title, tagType, colorCode, userId);
    }

    closeEditModal();
  };

  useEffect(() => {
    setTextColor(getTextColor(colorCode));
  }, [colorCode]);

  return (
    <Animated.View
      style={{
        width: '80%',

        aspectRatio: colorExpanded ? 3 / 5 : 5 / 4,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: theme.colors.light.level4,
        borderRadius: 10,
        // transition: 'all 0.5s',
      }}>
      {/* Modal Header */}
      <View
        style={{
          backgroundColor: colorCode,
          padding: 5,
          borderRadius: 5,
          marginBottom: 20,
        }}>
        <Text
          style={{
            color: textColor,
          }}>
          # {title}
        </Text>
      </View>

      {/* Modal Body */}
      <View
        style={{
          width: '100%',
          flex: 1,
          gap: 10,
        }}>
        <TextInput
          mode="outlined"
          placeholder="Title"
          value={title}
          onChangeText={text => setTitle(text)}
          style={{
            width: '100%',
            padding: 0,
            height: 40,
          }}
          outlineStyle={{
            borderWidth: 1,
            borderColor: theme.colors.dark.level2,
            borderRadius: 5,
          }}
          contentStyle={{
            fontSize: 16,
          }}
          placeholderTextColor={theme.colors.outline}
          activeOutlineColor={theme.colors.primary}
          left={
            <TextInput.Icon
              icon={() => (
                <Feather
                  name="hash"
                  size={16}
                  color={theme.colors.dark.level5}
                />
              )}
              color={theme.colors.outline}
              style={{
                marginLeft: -10,
              }}
            />
          }
          right={
            <TextInput.Icon
              icon="close"
              color={theme.colors.outline}
              onPress={() => setTitle('')}
              style={{
                marginRight: -10,
              }}
            />
          }
        />

        <View
          style={{
            width: '100%',
          }}>
          <TouchableOpacity
            style={{
              marginBottom: 10,
            }}
            onPress={() => setColorExpanded(!colorExpanded)}>
            <Text
              style={{
                color: theme.colors.primary,
                textDecorationLine: 'underline',
                marginBottom: 5,
              }}>
              {colorExpanded ? 'Collapse Color Picker' : 'Expand Color Picker'}
              <Feather
                name={colorExpanded ? 'chevrons-up' : 'chevrons-down'}
                size={14}
                color={theme.colors.primary}
              />
            </Text>
          </TouchableOpacity>

          {colorExpanded ? (
            <ColorPicker
              style={{
                width: '100%',
              }}
              onComplete={onSelectColor}>
              <Preview />
              <Panel5 />
              <OpacitySlider
                style={{
                  marginTop: 5,
                }}
              />
            </ColorPicker>
          ) : (
            <ColorPicker
              style={{
                width: '100%',
                justifyContent: 'center',
                // alignItems: 'center',
                zIndex: 100,
              }}
              onComplete={onSelectColor}>
              <Swatches
                colors={[
                  '#F5C46B',
                  '#F181C3',
                  '#8A00D4',
                  '#B5F16E',
                  '#74DFF8',
                  '#F9EB3B',
                  '#607D8B',
                ]}
                style={{
                  alignItems: 'center',
                }}
              />
            </ColorPicker>
          )}
        </View>
      </View>

      {/* Modal Footer */}
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 20,
          alignSelf: 'flex-end',
        }}>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 100,
            borderWidth: 1,
            borderColor: theme.colors.dark.level2,
            padding: 10,
          }}
          onPress={() => closeEditModal()}>
          <Text>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 100,
            backgroundColor: theme.colors.dark.level2,
            padding: 10,
          }}
          onPress={() => handleSaveTag()}>
          <Text
            style={{
              color: theme.colors.light.level2,
              fontWeight: 'bold',
            }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default EditTagModal;
